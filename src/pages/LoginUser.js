import React, { useState } from 'react';
import '../style/index.css';
import auth from '../models/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginUser = () => {

    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const postLogin = async () => {
        // TODO call post route with form data.

        const user = {
            // username: username,
            email: email,
            password: password
        }

        try {
            // For deployment: https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/login
            // For testing: http://localhost:1337/login
            const response = await fetch(`https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login.');
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }

    }
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        const response = await postLogin();

        if (response) {
            console.info("Login successful.");
            console.log(response); // The response + token.
            auth.token = response.token; // Set the token in the auth model.
            navigate('/documents'); // Redirect to the user's personal documents.
        }
    }

    return (
        <div className='width-half center'>
            <h1>Login</h1>
            <form className="width-full" onSubmit={onSubmit}>
                {/* <label className="form-element" htmlFor ="username">Username</label>
                <input
                    className="form-element"
                    type="text"
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /> */}
                <label className="form-element" htmlFor ="email">Email</label>
                <input
                    className="form-element"
                    type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="form-element" htmlFor ="password">Password</label>
                <input
                    className="form-element"
                    type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input className="form-element" type="submit" />
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    )
}

export default LoginUser;