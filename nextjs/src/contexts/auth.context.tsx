import router from "next/router"
import { createContext, ReactNode, useContext, useState } from "react"

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
    return useContext(AuthContext)
}

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<TUser>(userDefaultValue)
    const [connected, setConnected] = useState<boolean>(false)
    const [errors, setErrors] = useState<string[]>([])
    
    // User creation
    const register = async ({ ...props }: TRegisterParams) => {
console.log('register')        
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`${process.env.API_URL}/users`, { 
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                LastName: props.lastName,
                FirstName: props.firstName,
                Email: props.email,
                Password: props.password
            })
        })
        const json = await response.json();

        if (response.status !== 200) {
            setErrors([json.message])
        } else {
            setUser({
                lastName: json.LastName,
                firstName: json.FirstName,
                email: json.Email,
                id: json.Id
            })
            console.log('resister user set : ', user)
            router.push('/connected')
        }
    }

    // User login
    const login = async ({ ...props }: TLoginParams) => {
        setErrors([])

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`${process.env.API_URL}/users/show?Email=${props.email}&Password=${props.password}`, {})
        const json = await response.json();

        if (response.status !== 200) {
            setErrors([json.message])
        } else {
            setUser({
                lastName: json.LastName,
                firstName: json.FirstName,
                email: json.Email,
                id: json.Id,
                financialKnowledge: json.FinancialKnowledge
            })
            router.push('/connected')
            // await getAllUserInfo(setErrors)
        }
    }

    // User logout
    const logout = async () => {
        setUser(userDefaultValue)
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{user, connected, register, login, logout, errors}}>
            {children}
        </AuthContext.Provider>
    )
}
