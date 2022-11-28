import { useAuth } from "../hooks/useAuth"
import Button from "./buttons/Button"
import styles from './BodyRestitution.module.scss'

// Component to display responses
export default function BodyRestitution() {
	const { logout, user } = useAuth()

	return (
		<div className={styles.body}>
            <div className={styles.title}>Bonjour {user?.firstName}</div>
            <div className={`${styles.line1} ${styles.title}`}>Question 1: Avez-vous des connaissances en finances ?</div>
            <div className={`${styles.line2} ${styles.title}`}>Vous avez répondu : { user?.financialKnowledge === 0 ? 'Non' : 'Oui' }</div>
            <div className={`${styles.line1} ${styles.title}`}>Question 2: Quels produits financiers connaissez-vous ?</div>
            <div className={`${styles.line2} ${styles.title}`}>Vous avez répondu : {user?.financialProductsName}</div>
			<Button
				value='Retour à la page de login'
				onClick={() => logout()}
			></Button>
		</div>
	)
}
