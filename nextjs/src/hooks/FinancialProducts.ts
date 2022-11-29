import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";
import requestsService from "../services/requests.service";

interface IFinancialProduct {
    Id: number,
    Name: string
}

export const useFinancialProducts = () => {
	const [ financialProducts, setFinancialProducts ] = useState<IFinancialProduct[]>([]);
    const { logout, user } = useAuth();

    // Get list of financial products
    const getFinancialProducts = async () => {
        const [ status, response ] = await requestsService(`/financial_products`, 'GET');
        return response;
    }

	// Get list of financial products by user
    const getFinancialProductsByUser = async (userId : number) => {
        const [ status, response ] = await requestsService(`/users_financial_products/show?UserId=${userId}`, 'GET');

        if ( status !== 200 ) {
            return [];
        }
        return [ response.FinancialProductId, financialProducts?.find(elm => elm.Id == response.FinancialProductId )?.Name ];
    };

    // Save quizz responses
    const setResponses = async ({ financialKnowledge, financialProducts }: { financialKnowledge: number, financialProducts: number }) => {
        const [ status, response ] = await requestsService(`/users/${user.id}`, 'PATCH', 
        {
            FinancialKnowledge: financialKnowledge,
        });

        if ( status === 200 ) {
            const [ stat, res ] = await requestsService(`/users_financial_products`, 'POST', 
            {
                UserId: user.id,
                FinancialProductId: financialProducts,
            });
            if ( stat === 200 ) {
                logout();
            }
        }
    };

    useEffect(() => {
        getFinancialProducts().then((financial_products: IFinancialProduct[]) => {
			setFinancialProducts(financial_products)
		});
    }, []);

    return {
        financialProducts,
        getFinancialProductsByUser,
        setResponses
    };
}