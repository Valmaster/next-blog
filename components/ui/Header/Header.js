// Librairies
import classes from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react"


export default function Header() {
	// Variables
	const router = useRouter();
	const { data: session, status } = useSession()
	const loading = status === "loading"
	console.log('test', session);

	// Méthode
	const onLogoutClickedHandler = () => {
		signOut();
		router.push('/');
	};

	return (
		<header className={classes.Header}>
			<div
				className='container'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h1 style={{ margin: 0 }}>Blog</h1>
				<nav>
					<ul
						style={{
							display: 'flex',
							listStyleType: 'none',
							margin: 0,
							padding: 0,
							gap: '15px',
						}}
					>
						<li>
							<Link href='/'>Accueil</Link>
						</li>
						<li>
							<Link href='/articles'>Articles</Link>
						</li>

						{!session && !loading && (
							<>
								<li>
									<Link href='/login'>
										Login
									</Link>
								</li>
								<li>
									<Link href='/register'>
										Register
									</Link>
								</li>
							</>
						)}
						{session &&
						session?.user?.roles?.includes(
							'administrateur',
						) && (
							<li>
								<Link href='/articles/add'>
									Add
								</Link>
							</li>
						)}
						{session && (
							<li>
								<a
									onClick={onLogoutClickedHandler}
									style={{ cursor: 'pointer' }}
								>
									Logout
								</a>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}
