import React, { useEffect, useState } from 'react';
import auth from '../models/auth';
import { useNavigate } from 'react-router-dom';

const CreateDocument = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const postDocument = async () => {

        const doc = {
            title: title,
            content: content
        }

        console.log(doc);

        try {
            // For deployment: https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/documents
            // For testing: http://localhost:1337/documents
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': auth.token,
                },
                body: JSON.stringify(doc)
            });

            if (!response.ok) {
                throw new Error('Failed to post data.')
            }

            return response;
        } catch (error) {
            console.error(error);
        }

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const response = await postDocument(); // Post to /documents.
        if (response.ok) {
            console.info("Document created successfully.");
        }
    }

    // Only allowed logged in users to create new documents.
    // When a user is logged in the owner (email) is known.
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.token) {
            navigate('/login'); // Redirect to login if not logged in. Else continue rendering.
        }
    }, [auth, navigate]);


    return (
        <div className='width-half center'>
            <form className="width-full" onSubmit={onSubmit}>
                <label className="form-element" htmlFor ="title">Title</label>
                <input
                    className="form-element"
                    type="text"
                    name="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="form-element" htmlFor ="content">Content</label>
                <input
                    className="form-element"
                    type="text" 
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input className="form-element" type="submit" />
            </form>
        </div>
    )
}

export default CreateDocument;