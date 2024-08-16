
import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import freecodelogo from '../assets/images/logo512.png';
import googleLogo from '../assets/images/googlelogo.png'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();




    const handleSubmit = async (event) => {
        event.preventDefault();


        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        const payload = {
            name: name,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('https://talentproject-server.vercel.app/api/user/register', payload);
            console.log(response);
            // return;
            // console.log(response.status);
            if (response.data.value === true) {
                navigate('/course');
            }
            else {
                setMessage('User Already exists!, Click here to Sign in');
                // navigate('/signin');
            }
            // console.log(response.data);

        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error('There was an error!', error);
        }

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.logoContainer}>
                        <img src={freecodelogo} alt="freeCodeCamp Logo" style={styles.freecodelogo} />
                    </div>
                    <h2 style={styles.heading}>Sign up for  freeCodeCamp
                        <br />
                        Learn</h2>
                    <div style={styles.inputGroup}>
                        <Link to="/googlelogin" style={styles.googleLink}>
                            <div style={styles.google}>
                                <img src={googleLogo} alt="Google Logo" style={styles.googleLogo} />
                                <p style={styles.googleText}>Continue with Google</p>
                            </div>
                        </Link>
                        {/* <label>Name:</label> */}
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={styles.input}
                            placeholder='Enter Name'
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        {/* <label>Email:</label> */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                            placeholder='Enter email address'
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        {/* <label>Password:</label> */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            placeholder='Enter password'
                        />
                    </div>
                    <button type="submit" style={styles.button}>Sign up</button>

                    <div style={styles.register}>
                        {message && <Link to="/signin" style={styles.registerLink}> <p style={styles.message}>{message}</p></Link>}
                    </div>

                </form>


            </div>
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#d0d0d5',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#f1be32',
        color: '#0aoa23',
        border: 'none',
        cursor: 'pointer',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    freecodelogo: {
        width: '80px',
        height: '80px',
    },
    heading: {
        textAlign: 'center',
    },
    google: {
        display: 'flex',
        alignItems: 'center',
        border: "1px solid #1a1818",
        padding: "8px",
        marginTop: "10px",
        marginBottom: "10px",
        fontsize: "large",
        cursor: 'pointer',
    },
    googleLogo: {
        width: '15px',
        height: '15px',
        marginRight: '10px',
    },
    googleText: {
        margin: 0,
    },
    googleLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    register: {
        marginTop: '20px',
        textAlign: 'center',
    },
    registerLink: {
        color: '#007BFF',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    message: {
        marginTop: '10px',
        textAlign: 'center',
        color: '#ff0000',
    },

};

export default Register;
