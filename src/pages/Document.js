import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../style/index.css';
import auth from '../models/auth'
import { io } from "socket.io-client";

// const SERVER_URL = "http://localhost:1337";
const SERVER_URL = "https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/";

const GetDocument = () => {
    const params = useParams();
    const id = params.id;

    const [title, setTitle] = useState("Loading...");
    const [content, setContent] = useState("Loading...");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [selectedText, setSelectedText] = useState('');

    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL);

        socket.current.emit('joinRoom', id); // test

        socket.current.on("content", (data) => {
            setContent(data);
        });

        return () => {
            socket.current.disconnect();
        }
    }, []);

    function handleContentChange(e) {
        const value = e.target.value;

        // socket.current.emit("content", value) // previous
        socket.current.emit("content", { room: id, content: value }); // test
    }


    const handleInputSelection = (e) => {
        const inputElement = e.target;

        // Ensure that selectionStart and selectionEnd are not null
        if (inputElement.selectionStart !== null && inputElement.selectionEnd !== null) {
            const start = inputElement.selectionStart;
            const end = inputElement.selectionEnd;

            if (start !== end) {
                const text = inputElement.value.substring(start, end);
                setSelectedText(text); // Save the selected text
                console.log("Selected text:", text);
            } else {
                setSelectedText('');
            }
        } else {
            console.log("Input is not focused or no selection");
        }
    };

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

    const inviteUser = async () => {
        const invitedUser = {
            id: id,
            email: email
        }

        console.log(invitedUser);

        try {
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': auth.token,
                },
                body: JSON.stringify(invitedUser)
            });

            if (!response.ok) {
                throw new Error('Failed to post data.')
            }

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const commentDocument = async () => {
        const commentObject = {
            id: id,
            text: selectedText,
            comment: comment
        }

        console.log(commentObject);
        // https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/comment
        try {
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': auth.token,
                },
                body: JSON.stringify(commentObject)
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

    const onSubmitInvite = async (event) => {
        event.preventDefault();
        await inviteUser();
    }

    const onSubmitComment = async (event) => {
        event.preventDefault();
        const result = await commentDocument();
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
        <>
        <div className='center-wrapper'>
        <div className="main-container">
            <div className="left-column">
                <div className="width-full">
                    <h1>Displaying single document</h1>
                    <form className="width-full" onSubmit={onSubmit}>
                        <label className="form-element" htmlFor="id">ID (readonly)</label>
                        <input className="form-element" type="text" name="id" defaultValue={id} readOnly />
                        <label className="form-element" htmlFor="title">Title</label>
                        <input
                            id="title"
                            className="form-element"
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="form-element" htmlFor="content">Content</label>
                        <input
                            id="content"
                            className="form-element"
                            type="text"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            onSelect={handleInputSelection}
                        />
                        <input className="form-element" type="submit" value="Save"/>
                    </form>
                </div>

                <div className="width-full" style={{ marginTop: '30px' }}>
                    <h1>Invite users to: {title}</h1>
                    <form className="width-full" onSubmit={onSubmitInvite}>
                        <label className="form-element" htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="form-element"
                            type="email"
                            name="email"
                            placeholder="test@test.se"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input className="form-element" type="submit" value="Invite"/>
                    </form>
                </div>
            </div>

            <div className="right-column">
                <h1>Comments</h1>
                <form className="width-full" onSubmit={onSubmitComment}>
                    <label className="form-element" htmlFor="selectedText">Selected Text</label>
                    <input
                        id="selectedText"
                        className="form-element"
                        type="text"
                        name="selectedText"
                        value={selectedText}
                        readOnly
                    />
                    <label className="form-element" htmlFor="inputComment">Write your comment</label>
                    <input
                        id="inputComment"
                        className="form-element"
                        type="text"
                        name="inputComment"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <input className="form-element" type="submit" value="comment"/>
                </form>
            </div>
        </div>
        </div>
</>
      );
}

export default GetDocument;