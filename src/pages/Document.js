import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/index.css';

const GetDocument = () => {
    const params = useParams();
    const id = params.id;

    const [title, setTitle] = useState("Loading...");
    const [content, setContent] = useState("Loading...");

    const fetchDocument = async () => {
        try {
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/document/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data.')
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const updateDocument = async () => {
        // TODO call post route with updated info.
        const doc = {
            id: id,
            title: title,
            content: content
        }

        try {
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/document/update`, {
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
        const result = await updateDocument();
        console.log(result);

    }

    useEffect(() => {
        const dataFetchingEffect = async () => {
          const result = await fetchDocument();
          const document = result[0];
          setTitle(document.title);
          setContent(document.content);
          console.log(document);
        };
        dataFetchingEffect();
      }, []);

      return (
        <div className='width-half center'>
            <h1>Fetched Data</h1>
            <form className="width-full" onSubmit={onSubmit}>

                <label className="form-element" htmlFor="id">ID (readonly)</label>
                <input className="form-element" type="text" name="id" defaultValue={id} readOnly />
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
      );
}

export default GetDocument;