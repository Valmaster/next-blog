import classes from './ArticleCard.module.css';
import Link from 'next/link';

const ArticleCard = ({article}) => {

    return (
        <Link href={`/articles/${article.slug}`}>
            <>
                <a className={classes.ArticleCard}>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <small>{article.created_at}</small>
                </a>
            </>
        </Link>
    );
}

export default ArticleCard


