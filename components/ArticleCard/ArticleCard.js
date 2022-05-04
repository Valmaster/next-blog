import Link from 'next/link';
import classes from './ArticleCard.module.css';

const ArticleCard = (article) => {

    return (
        <Link href={`/articles/${article.slug}`}>
            <>
                <a className={classes.ArticleCard}>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                </a>
                <small>{article.created_at}</small>
            </>
        </Link>
    );
}

export default ArticleCard


