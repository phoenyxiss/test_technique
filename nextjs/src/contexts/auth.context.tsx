import router from "next/router";
import requestsService from "../services/requests.service";
import { createContext, ReactNode, useContext, useState } from "react";
import { useFinancialProducts } from "../hooks/FinancialProducts";

type TUser = {
    id?: number,
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
    financialKnowledge?: number,
    financialProducts?: number,
    financialProductsName?: string
}

type TAuthContext = {
    user: TUser,
    connected: boolean,
    register: Function,
    login: Function,
    logout: Function,
    errors: string[]
}

interface TRegisterParams {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

interface TLoginParams {
    email: string,
    password: string
}

const userDefaultValue = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password:'',
    financialKnowledge: 0,
    financialProducts: 0,
    financialProductsName: ''
}

const authContextDefaultValue = {
    user: userDefaultValue,
    connected: false,
    register: () => {},
    login: () => {},
    logout: () => {},
    errors: []
}

export const AuthContext = createContext<TAuthContext>(authContextDefaultValue)

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [ user, setUser ] = useState<TUser>(userDefaultValue);
    const [ connected, setConnected ] = useState<boolean>(false);
    const [ errors, setErrors ] = useState<string[]>([]);
    const { getFinancialProductsByUser } = useFinancialProducts();
    
    // User creation
    const register = async ({ ...props }: TRegisterParams) => {
        const [ status, response ] = await requestsService(`/users`, 'POST', 
            {
                LastName: props.lastName,
                FirstName: props.firstName,
                Email: props.email,
                Password: props.password
            });

        if ( status !== 200 ) {
            setErrors([response.message]);
        } else {
            setUser({
                lastName: response.LastName,
                firstName: response.FirstName,
                email: response.Email,
                id: response.Id
            });
            router.push('/connected');
        }
    };

    // User login
    const login = async ({ ...props }: TLoginParams ) => {
        const [ status, response ] = await requestsService(`/users/show?Email=${props.email}&Password=${props.password}`, 'GET');

        if ( status !== 200 ) {
            setErrors([response.message]);
        } else {
            const [ financialProductId, financialProductsName ] = await getFinancialProductsByUser(response.Id);
            setUser({
                lastName: response.LastName,
                firstName: response.FirstName,
                email: response.Email,
                id: response.Id,
                financialKnowledge: response.FinancialKnowledge,
                financialProducts: financialProductId,
                financialProductsName: financialProductsName
            });
            router.push('/connected');
        };
    };

    // User logout
    const logout = async () => {
        setUser(userDefaultValue);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{user, connected, register, login, logout, errors}}>
            {children}
        </AuthContext.Provider>
    );
}
