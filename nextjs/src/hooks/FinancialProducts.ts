import { useEffect, useState } from "react"


// interface IFinancialProduct {
//     Id: number,
//     Name: string
// }

// export const useFinacialProducts = () => {
// 	const [financialProducts, setFinancialProducts] = useState<IFinancialProduct[]>([])

//     // Get list of financial products
//     const getFinancialProducts = async () => {

//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         const response = await fetch(`${process.env.API_URL}/financial_products`, {})
//         const json = await response.json();

//         // if (response.status !== 200) {
//         //     setErrors([json.message])
//         // } else {
//         //     financial_products = json
//         // }
//         return json
//     }

// 	// Get list of financial products by user
//     const getFinancialProductsByUser = async (setErrors : (value: string[]) => void) => {
//         setErrors([])

// 		const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         const response = await fetch(`${process.env.API_URL}/users_financial_products/show?UserId=${user?.id}`, {})
//         const json = await response.json();

//         if (response.status !== 200) {
//             setErrors([json.message])
//         } else {
//             if(user !== undefined) {
//                 user.financialProducts = json.FinancialProductId
//                 user.financialProductsName = financial_products?.find(elm => elm.Id == json.FinancialProductId )?.Name
//             }
//         }

//     }

//     useEffect(() => {
//         getFinancialProducts().then((financial_products: IFinancialProduct[]) => {
// 			setFinancialProducts(financial_products)
// 		})
//     }, [])

//     return (financialProducts)
// }