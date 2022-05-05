import classes from './ArticleCard.module.css';

const ArticleCard = ({article = null}) => {
    return (
        <>
            <a className={classes.ArticleCard}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <small>{article.created_at}</small>
            </a>
        </>
    );
}

export default ArticleCard


