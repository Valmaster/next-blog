// Librairies
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';

// Composants
import Button from '../../components/ui/Button/Button';
import Error from '../../components/ui/Error/Error';

export default function Inscription() {
	// Variables
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// States
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isRegistered, setIsRegistered] = useState(false);

	// Méthode
	const onFormSubmittedHandler = async (data) => {
		if (!isLoading) {
			setIsLoading(true);
			setError(null);
			// Envoyer le nouveau projet sur notre API Next
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const fetchedData = await response.json();

			if (!response.ok) {
				setIsLoading(false);
				setError(
					fetchedData.message || 'Une erreur est survenue.',
				);
			} else {
				setIsLoading(false);
				setIsRegistered(fetchedData.utilisateur);
			}
		}
	};

	return (
		<>
			<h1 style={{ textAlign: 'center', marginTop: '35px' }}>
				Inscription
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
					{isRegistered ? (
						<div>
							Félicitations {isRegistered.username} ! Vous
							pouvez maintenant vous connecter.
						</div>
					) : (
						<form
							onSubmit={handleSubmit(
								onFormSubmittedHandler,
							)}
						>
							<p>
								<label htmlFor='username'>Username</label>
								<input
									type='text'
									placeholder='username'
									className='input'
									{...register('username', {
										required: true,
									})}
								/>
								{errors.username && (
									<small>
										Veuillez renseigner ce champ.
									</small>
								)}
							</p>
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
									errors.email.type ===
										'required' && (
										<small>
											Veuillez renseigner ce
											champ.
										</small>
									)}
								{errors.email &&
									errors.email.type ===
										'pattern' && (
										<small>
											Votre adresse email n'est
											pas correct, veuillez
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
										Veuillez renseigner ce champ.
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
										"Je m'inscris"
									)}
								</Button>
							</div>
						</form>
					)}
				</main>
			</section>
		</>
	);
}

