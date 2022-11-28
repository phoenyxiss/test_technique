import { useAuth } from "../hooks/useAuth"
import Button from "./Button"

// Component to display responses
export default function BodyRestitution() {
	const { logout, user } = useAuth({})

	return (
		<div>
            <div className="line1">Bonjour {user?.firstName}</div>
            <div className="line2">Question 1: Avez-vous des connaissances en finances ?</div>
            <div className="line3">Vous avez répondu : { user?.financialKnowledge === 0 ? 'Non' : 'Oui' }</div>
            <div className="line4">Question 2: Quels produits financiers connaissez-vous ?</div>
            <div className="line5">Vous avez répondu : {user?.financialProductsName}</div>
			<Button
				value='Retour à la page de login'
				onClick={() => logout()}
			></Button>
		</div>
	)
}
