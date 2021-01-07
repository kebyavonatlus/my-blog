import { React } from "react";
import ArticleList from '../componets/ArticlesList';
import articleContent from './article-content';
import NotFoundPage from "./NotFoundPage";

const ArticlePage = ({ match }) => {
    const name = match.params.name;

    const article = articleContent.find(article => article.name === name);

    const otherArticle = articleContent.filter(article => article.name !== name);

    if (!article) return <NotFoundPage></NotFoundPage>

    return (
        <>
            <div>
                <h1>{article.title}</h1>
                {article.content.map((paragraph, key) => (
                    <p key={key}>{paragraph}</p>
                ))}
            </div>

            <h3>Other articles:</h3>

            <ArticleList articles={otherArticle} />
        </>
    );
}

export default ArticlePage;