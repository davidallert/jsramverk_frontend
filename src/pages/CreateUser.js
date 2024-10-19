import React, { useState } from 'react';
import '../style/index.css';

const CreateUser = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const postUser = async () => {
        // TODO call post route with form data.

        const user = {
            username: username,
            email: email,
            password: password
        }

        try {
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
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
        const response = await postUser(); // Post to /documents.
        // console.log(response)
        if (response.ok) {
            console.info("User created successfully.");
        }
    }

    return (
        <div className='width-half center'>
            <form className="width-full" onSubmit={onSubmit}>
                <label className="form-element" htmlFor ="username">Username</label>
                <input
                    className="form-element"
                    type="text"
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-element" htmlFor ="email">Email</label>
                <input
                    className="form-element"
                    type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-element" htmlFor ="password">Password</label>
                <input
                    className="form-element"
                    type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input className="form-element" type="submit" />
            </form>
        </div>
    )
}

export default CreateUser;