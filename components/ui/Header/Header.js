// Librairies
import classes from './Header.module.css';

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
                            <a href='/'>Accueil</a>
                        </li>
                        <li>
                            <a href='/articles'>Articles</a>
                        </li>

                        <>
                            <li>
                                <a href='/connexion'>
                                    Connexion
                                </a>
                            </li>
                            <li>
                                <a href='/inscription'>
                                    Inscription
                                </a>
                            </li>
                        </>
                        <li>
                            <a href='/ajouter'>
                                Ajouter
                            </a>
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
