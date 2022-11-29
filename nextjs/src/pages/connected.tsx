import Head from "next/head";
import Image from "next/image";
import BodyRestitution from "../components/BodyRestitution";
import BodyQuestions from "../components/BodyQuestions";
import { useAuth } from "../contexts/auth.context";
import styles from "./connected.module.scss";

// Component to display either questions or responses
export default function Connected() {
	const { logout, user } = useAuth();

	if( user === undefined || user.email === ''	)
		logout();

    return (
		<div className={styles.container}>
			<Head>
				<title>Colbr</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.connected}>
				<a href="https://colbr.co/">
					<span>
						<Image src="/logo-colbr.webp" alt="Colbr Logo" width={121.03} height={45} />
					</span>
				</a>
			</main>
			{( user?.financialKnowledge !== undefined && user.financialProductsName !== undefined ) ? <BodyRestitution></BodyRestitution> : <BodyQuestions></BodyQuestions>}
		</div>
	);
}
