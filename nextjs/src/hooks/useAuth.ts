import { useRouter } from "next/router"
import { useEffect } from "react"

interface IUser {
    id?: number,
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
    financialKnowledge?: number,
    financialProducts?: number,
    financialProductsName?: string
}

interface IFinancialProduct {
    Id: number,
    Name: string
}

interface IRegisterParams {
    setErrors: (value: string[]) => void,
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

interface ILoginParams {
    setErrors: (value: string[]) => void,
    email: string,
    password: string
}

interface IQuestionParams {
    setErrors: (value: string[]) => void,
    financialKnowledge: number,
    financialProducts: number
}

let {user, error, financial_products}: { user: IUser | undefined , error: string | undefined, financial_products: IFinancialProduct[] | undefined} = {
    user: undefined,
    error: undefined,
    financial_products: []
}

export const useAuth = () => {
    const router = useRouter()

    // User creation
    const register = async ({ setErrors, ...props }: IRegisterParams) => {
        setErrors([])
        console.log('register', user)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`http://localhost:8000/api/users`, { 
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
            user = {
                lastName: json.LastName,
                firstName: json.FirstName,
                email: json.Email,
                id: json.Id
            }
            await getFinancialProducts(setErrors)
            router.push('/connected')
        }
    }

    // User login
    const login = async ({ setErrors, ...props }: ILoginParams) => {
        setErrors([])
        console.log('login', user)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`http://localhost:8000/api/users/show?Email=${props.email}&Password=${props.password}`, {})
        const json = await response.json();

        if (response.status !== 200) {
            setErrors([json.message])
        } else {
            user = {
                lastName: json.LastName,
                firstName: json.FirstName,
                email: json.Email,
                id: json.Id,
                financialKnowledge: json.FinancialKnowledge
            }
            await getFinancialProducts(setErrors)
            await getAllUserInfo(setErrors)
            router.push('/connected')
        }
    }

    // User logout
    const logout = async () => {
        console.log('logout')
        user = undefined
        router.push('/')
    }

    // Save quizz responses
    const setResponses = async ({ setErrors, ...props }: IQuestionParams) => {
        setErrors([])
        console.log('responses', user)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({
                FinancialKnowledge: props.financialKnowledge,
            })
        })
        const json = await response.json();

        if (response.status !== 200) {
            setErrors([json.message])
        } else {
            const response = await fetch(`http://localhost:8000/api/users_financial_products`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    UserId: user?.id,
                    FinancialProductId: props.financialProducts,
                })
            })

            const res = await response.json();
            if (response.status !== 200) {
                setErrors([res.message])
            } else {
                logout()
            }
        }
    }

    // Get list of financial products
    const getFinancialProducts = async (setErrors : (value: string[]) => void) => {
        setErrors([])
        console.log('getfn', user)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`http://localhost:8000/api/financial_products`, {})
        const json = await response.json();

        if (response.status !== 200) {
            setErrors([json.message])
        } else {
            financial_products = json
        }
    }

    // Get user information and his responses
    const getAllUserInfo = async (setErrors : (value: string[]) => void) => {
        setErrors([])
        console.log('alluserinfo', user)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`http://localhost:8000/api/users_financial_products/show?UserId=${user?.id}`, {})
        const json = await response.json();

        if (response.status !== 200) {
            setErrors([json.message])
        } else {
            if(user !== undefined) {
                user.financialProducts = json.FinancialProductId
                user.financialProductsName = financial_products?.find(elm => elm.Id == json.FinancialProductId )?.Name
            }
        }

    }

    // // Redirection
    // useEffect(() => {
    //     console.log("useEffect", user)
    //     if (redirectIfAuth !== undefined && user !== undefined)
    //         router.push(redirectIfAuth)
    //     if (error !== undefined) logout()
    // }, [user, error])

    return {
        user,
        financial_products,
        register,
        login,
        logout,
        setResponses,
    }
}