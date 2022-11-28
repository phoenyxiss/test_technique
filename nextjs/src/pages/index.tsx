import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import styles from '../../styles/Home.module.css'
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
			<main className={styles.main}>
				<a href="https://colbr.co/">
					<span className={styles.logo}>
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
		<div>
			<div className={styles.title}>{section === SectionType.register ? "Création de ton espace Colbr" : "Accès à ton espace Colbr" }</div>
			{section === SectionType.register ? 
				<p className={styles.subtitle}>Déjà enregistré ? <a onClick={() => {setSection(SectionType.login)}}>Connecte-toi ici</a></p> : 
				<p className={styles.subtitle}>Pas de compte ? <a onClick={() => {setSection(SectionType.register)}}>Enregistre-toi ici</a></p>
			}
			{section === SectionType.register ? <RegisterForm></RegisterForm> : <LoginForm></LoginForm> }
		</div>
	)
}

// Login component
function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<string[]>([])
	const { login } = useAuth({
		redirectIfAuth: '/connected',
	})

	const submitForm = (e: FormEvent) => {
		e.preventDefault()
		void login({
			setErrors,
			email,
			password
		})
	}

	return (
		<form className={styles.financialknowledgeform} onSubmit={submitForm}>
			<Input
				className='email'
				id='email'
				type='text'
				value={email}
				onChange={e => setEmail(e.target.value)}
			></Input>
			<Input
				className='password'
				id='password'
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			></Input>
			<button type="submit">Login</button>
			<span className='error'>{errors.join(" ")}</span>
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
	const { register } = useAuth({
		redirectIfAuth: '/connected',
	})

	const submitForm = (e: FormEvent) => {
		e.preventDefault()
		void register({
			setErrors,
			firstName,
			lastName,
			email,
			password
		})
	}

	return (
		<form className={styles.financialproductsform} onSubmit={submitForm}>
			<Input
				className='firstname'
				id='firstname'
				type='text'
				value={firstName}
				onChange={e => setFirstName(e.target.value)}
			></Input>
			<Input
				className='lastname'
				id='lastname'
				type='text'
				value={lastName}
				onChange={e => setLastName(e.target.value)}
			></Input>
			<Input
				className='email'
				id='email'
				type='text'
				value={email}
				onChange={e => setEmail(e.target.value)}
			></Input>
			<Input
				className='password'
				id='password'
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			></Input>
			<button type="submit">Création de mon espace</button>
			<span className='error'>{errors.join(" ")}</span>
		</form>
	)
}
