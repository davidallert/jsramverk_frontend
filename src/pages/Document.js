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

        // socket.current.emit("content", value) // old
        socket.current.emit("content", { room: id, content: value }); // test
    }

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

    const onSubmit = async (event) => {
        event.preventDefault();
        const result = await updateDocument();
        console.log(result);

    }

    const onSubmitInvite = async (event) => {
        event.preventDefault();
        await inviteUser();
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
            {/* Document form */}
            <div className='width-half center'>
                <h1>Displaying single document</h1>
                <form className="width-full" onSubmit={onSubmit}>

                    <label className="form-element" htmlFor="id">ID (readonly)</label>
                    <input className="form-element" type="text" name="id" defaultValue={id} readOnly />
                    <label className="form-element" htmlFor ="title">Title</label>
                    <input
                        id="title"
                        className="form-element"
                        type="text"
                        name="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="form-element" htmlFor ="content">Content</label>
                    <input
                        id="content"
                        className="form-element"
                        type="text" 
                        name="content"
                        value={content}
                        // onChange={(e) => setContent(e.target.value)}
                        onChange={handleContentChange}
                    />
                    <input className="form-element" type="submit" value="Save"/>
                </form>
            </div>

            {/* Divider */}
            <hr style={{marginTop: 50 + 'px', marginBottom: 50 + 'px'}}></hr> 

            {/* Invite form */}
            <div className='width-half center'>
                <h1>Invite users to: {title}</h1>
                <form className="width-full" onSubmit={onSubmitInvite}>
                    <label className="form-element" htmlFor ="title">Email</label>
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
        </>
      );
}

export default GetDocument;