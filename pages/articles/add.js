import Head from 'next/head';
import {useForm} from 'react-hook-form';
import {SpinnerDotted} from 'spinners-react';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Error from "../../components/ui/Error/Error";
import Button from "../../components/ui/Button/Button";

export default function Add() {
    // Variables
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const router = useRouter();

    // States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // Méthode
    const onSubmittedHandler = async (data) => {
        if (!isLoading) {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/article', {
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
                await router.replace(`/articles/${fetchedData.article.slug}`);
            }
        }
    };

    return (
        <>
            <Head>
                <title>Ajouter un article</title>
            </Head>
            <h1 style={{textAlign: 'center', marginTop: '35px'}}>
                Ajouter un article
            </h1>
            <section
                style={{display: 'flex', justifyContent: 'center'}}
            >
                <main
                    style={{
                        backgroundColor: '#f3f3f3',
                        padding: '30px',
                    }}
                >
                    {(errors.title ||
                        errors.slug ||
                        errors.description) && (
                        <Error>
                            Veuillez remplir tous les champs du
                            formulaire.
                        </Error>
                    )}
                    {error && <Error>{error}</Error>}
                    <form onSubmit={handleSubmit(onSubmittedHandler)}>
                        <p>
                            <label htmlFor='title'>Titre</label>
                            <input
                                id='title'
                                placeholder='Titre'
                                className='input'
                                {...register('title', {
                                    required: true,
                                })}
                            />
                        </p>
                        <p>
                            <label htmlFor='slug'>Slug</label>
                            <input
                                id='slug'
                                placeholder='Slug'
                                className='input'
                                {...register('slug', {
                                    required: true,
                                })}
                            />
                        </p>
                        <p>
                            <label htmlFor='description'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                placeholder='Description'
                                rows='5'
                                className='input'
                                {...register('description', {
                                    required: true,
                                })}
                            />
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
                                    'Ajouter'
                                )}
                            </Button>
                        </div>
                    </form>
                </main>
            </section>
        </>
    );
}
