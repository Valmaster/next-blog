// Librairies
import classes from './ArticleCard.module.css';

const ArticleCard = () => {

    return (
        <>
            <div className={classes.ArticleCard}>
                <h3>Titre</h3>
                <p>Description</p>
            </div>
            <small>Date de création</small>
        </>
    );
}

export default ArticleCard


