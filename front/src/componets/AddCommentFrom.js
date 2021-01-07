import React, { useState } from 'react';

const AddCommentForm = ({articleName, setArticleInfo }) => {
    const [userName, setUserName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: "POST",
            body: JSON.stringify({userName, text: commentText}),
            headers: {
                'Content-type': 'application/json',
            }
        });

        const body = await result.json();

        setArticleInfo(body);
        setUserName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
            <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)} />
            </label>
            <label>
                Comment:
            <textarea rows="4" cols="50" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
            </label>
            <button onClick={() => addComment()}>Add Comment</button>
        </div>
    )
};

export default AddCommentForm;