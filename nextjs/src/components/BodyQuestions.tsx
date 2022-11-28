import { useState } from "react"
import Button from "./Button"
import { useAuth } from "../hooks/useAuth"
import styles from './BodyQuestions.module.scss'

enum QuizzType {
    question1,
    question2,
    end
}

// Component to display questions
export default function BodyQuestions() {
	const [quizzpage, setQuizzpage] = useState(QuizzType.question1)
	const [errors, setErrors] = useState<string[]>([])
	const [financialKnowledge, setfinancialKnowledge] = useState(0)
	const [financialProducts, setfinancialProducts] = useState(0)
	const { logout, setResponses } = useAuth()
	const save = () => {
		setResponses({setErrors, financialKnowledge, financialProducts})
	}

	return (
		<div className={styles.body}>
			{quizzpage === QuizzType.question1 ? <Question1Form setValue={setfinancialKnowledge}></Question1Form> : 
				quizzpage === QuizzType.question2 ? <Question2Form setValue={setfinancialProducts}></Question2Form> : 
					<End save={save}></End>
			}
			{quizzpage !== QuizzType.end ? 
				<div className={styles.btnvalidation}>
					<Button
						value='Annuler'
						onClick={() => {quizzpage === QuizzType.question1 ? logout() : setQuizzpage(QuizzType.question1)}}
					></Button>
					<Button
						value='Continuer'
						onClick={() => {setQuizzpage(quizzpage === QuizzType.question1 ? QuizzType.question2 : QuizzType.end)}}
					></Button>
				</div>
				: ""
			}
		</div>
	)
}

function Question1Form({ setValue }: { setValue(value: number): void} ) {
	return (
	  <div className={`${styles.auth}`}>
        <div className={styles.title}>Avez-vous des connaissances en finances ?</div>
		<Button
			value='Non'
			onClick={() => { setValue(0)}}
		></Button>
		<Button
			value='Oui'
			onClick={() => { setValue(1)}}
		></Button>
	  </div>
	)
  }

function Question2Form({ setValue }: { setValue(value: number): void} ) {
	const { financial_products } = useAuth()

	return (
		<div className={`${styles.body}`}>
			<div className={styles.title}>Quels produits financiers connaissez-vous ?</div>
			{financial_products?.map(element => 
				<Button
					key={element.Id}
					value={element.Name}
					onClick={() => { setValue(element.Id)}}
				></Button>
			)}
		</div>
	)
}

function End({ save }: { save(): void}) {
	return (
		<div>
			<div className={styles.title}>Merci pour votre particitation !</div>
			<Button
				value='Retour à la page de login'
				onClick={save}
			></Button>
		</div>
	)
}
