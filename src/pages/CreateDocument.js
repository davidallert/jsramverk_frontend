import React, { useState } from 'react';


const CreateDocument = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const postDocument = async () => {
        // TODO call post route with form data.

        const doc = {
            title: title,
            content: content
        }

        console.log(doc);

        try {
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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