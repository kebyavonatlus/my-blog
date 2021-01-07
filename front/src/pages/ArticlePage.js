import React, { useState, useEffect } from "react";
import ArticleList from '../componets/ArticlesList';
import CommentsList from '../componets/CommentsList';
import UpvotesSection from '../componets/UpvotesSection';
import AddCommentForm from '../componets/AddCommentFrom';
import articleContent from './article-content';
import NotFoundPage from "./NotFoundPage";

const ArticlePage = ({ match }) => {
    const name = match.params.name;

    const article = articleContent.find(article => article.name === name);

    const otherArticle = articleContent.filter(article => article.name !== name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(async () => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        };

        fetchData();
    }, [name])

    if (!article) return <NotFoundPage></NotFoundPage>

    return (
        <>
            <div>
                <h1>{article.title}</h1>
                <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>
                {article.content.map((paragraph, key) => (
                    <p key={key}>{paragraph}</p>
                ))}
            </div>

            <CommentsList comments={articleInfo.comments ?? []} />

            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>

            <h3>Other articles:</h3>
            <ArticleList articles={otherArticle} />
        </>
    );
}

export default ArticlePage;