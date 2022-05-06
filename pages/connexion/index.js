// Librairies
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { useRouter } from 'next/router';

// Composants
import Button from '../../components/ui/Button/Button';
import Error from '../../components/ui/Error/Error';

export default function Connexion() {
	// Variables
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	// States
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	// Méthode
	const onFormSubmittedHandler = async (data) => {
		setIsLoading(true);
		setError(null);

		const resultat = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		setIsLoading(false);

		if (resultat.error) {
			setError(resultat.error);
		} else {
			router.replace('/');
		}
	};

	return (
		<>
			<h1 style={{ textAlign: 'center', marginTop: '35px' }}>
				Connexion
			</h1>
			<section
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<main
					style={{
						backgroundColor: '#f3f3f3',
						padding: '30px',
					}}
				>
					{error && <Error>{error}</Error>}
					<form
						onSubmit={handleSubmit(
							onFormSubmittedHandler,
						)}
					>
						<p>
							<label htmlFor='email'>
								Adresse email
							</label>
							<input
								type='email'
								placeholder='Adresse email'
								className='input'
								{...register('email', {
									required: true,
									pattern:
										/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								})}
							/>
							{errors.email &&
								errors.email.type === 'required' && (
									<small>
										Vous devez renseigner ce
										champ.
									</small>
								)}
							{errors.email &&
								errors.email.type === 'pattern' && (
									<small>
										La syntaxe de votre adresse
										email est incorrecte. Veuillez
										vérifier de nouveau.
									</small>
								)}
						</p>
						<p>
							<label htmlFor='password'>
								Mot de passe
							</label>
							<input
								type='password'
								placeholder='Mot de passe'
								className='input'
								{...register('password', {
									required: true,
								})}
							/>
							{errors.password && (
								<small>
									Vous devez renseigner ce champ.
								</small>
							)}
						</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'end',
							}}
						>
							<Button>
								{isLoading ? (
									<SpinnerDotted
										size={15}
										thickness={100}
										speed={100}
										color='#ffffff'
									/>
								) : (
									'Je me connecte'
								)}
							</Button>
						</div>
					</form>
				</main>
			</section>
		</>
	);
}
