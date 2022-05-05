// Librairies
import classes from './Header.module.css';
import Link from 'next/link';

export default function Header() {

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
                <h1 style={{margin: 0}}>Blog</h1>
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

                        <>
                            <li>
                                <Link href='/connexion'>
                                    Connexion
                                </Link>
                            </li>
                            <li>
                                <Link href='/inscription'>
                                    Inscription
                                </Link>
                            </li>
                        </>
                        <li>
                            <Link href='/ajouter'>
                                Ajouter
                            </Link>
                        </li>
                        <li>
                            <a
                                style={{cursor: 'pointer'}}
                            >
                                Déconnexion
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
