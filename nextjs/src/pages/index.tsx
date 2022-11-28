import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import styles from './index.module.scss'
import Input from '../components/Input'
import { useAuth } from '../hooks/useAuth'

export enum SectionType {
	login,
	register
}

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Colbr</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.home}>
				<a href="https://colbr.co/">
					<span>
						<Image src="/logo-colbr.webp" alt="Colbr Logo" width={121.03} height={45} />
					</span>
				</a>
			</main>
			<Body></Body>
		</div>
	)
}

// Body component
function Body() {
	const [section, setSection] = useState(SectionType.register)

	return (
		<div className={styles.body}>
			<div className={styles.auth}>
				<div className={styles.title}>{section === SectionType.register ? "Création de ton espace Colbr" : "Accès à ton espace Colbr" }</div>
				{section === SectionType.register ? 
					<p className={styles.subtitle}>Déjà enregistré ? <a onClick={() => {setSection(SectionType.login)}}>Connecte-toi ici</a></p> : 
					<p className={styles.subtitle}>Pas de compte ? <a onClick={() => {setSection(SectionType.register)}}>Enregistre-toi ici</a></p>
				}

				{section === SectionType.register ? <RegisterForm></RegisterForm> : <LoginForm></LoginForm> }
			</div>
		</div>
	)
}

// Login component
function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<string[]>([])
	const { login } = useAuth()

	const submitForm = async (e: FormEvent) => {
		e.preventDefault()
		await void login({
			setErrors,
			email,
			password
		})
	}

	return (
		<form className={styles.loginform} onSubmit={submitForm}>
			<Input
				className={styles.email}
				id='email'
				type='text'
				value={email}
				placeholder='Entrez votre adresse email'
				onChange={e => setEmail(e.target.value)}
			></Input>
			<Input
				className={styles.password}
				id='password'
				type='password'
				value={password}
				placeholder='•••••••••••••••••••••'
				onChange={e => setPassword(e.target.value)}
			></Input>
			<button className={styles.button} type="submit">Login</button>
			{errors.length > 0 ? <span className={styles.error}>{errors.join(" ")}</span> : ""}
		</form>
	)
}

// Register component
function RegisterForm() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<string[]>([])
	const { register } = useAuth()

	const submitForm = async (e: FormEvent) => {
		e.preventDefault()
		await void register({
			setErrors,
			firstName,
			lastName,
			email,
			password
		})
	}

	return (
		<form className={styles.registerform} onSubmit={submitForm}>
			<Input
				className={styles.firstname}
				id='firstname'
				type='text'
				value={firstName}
				placeholder='Prénom*'
				onChange={e => setFirstName(e.target.value)}
			></Input>
			<Input
				className={styles.lastname}
				id='lastname'
				type='text'
				value={lastName}
				placeholder='Nom*'
				onChange={e => setLastName(e.target.value)}
			></Input>
			<Input
				className={styles.email}
				id='email'
				type='text'
				value={email}
				placeholder='Email*'
				onChange={e => setEmail(e.target.value)}
			></Input>
			<Input
				className={styles.password}
				id='password'
				type='password'
				value={password}
				placeholder='•••••••••••••••••••••'
				onChange={e => setPassword(e.target.value)}
			></Input>
			<button className={styles.button} type="submit">Création de mon espace</button>
			{errors.length > 0 ? <span className={styles.error}>{errors.join(" ")}</span> : ""}
		</form>
	)
}
