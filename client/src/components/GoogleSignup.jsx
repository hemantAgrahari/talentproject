import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const GoogleSignUp = () => {

    const [payLoad1, setPayLoad1] = useState({});
    const [payLoad2, setPayLoad2] = useState({});
    const navigate = useNavigate();


    console.log("this is payload1", payLoad1);

    useEffect(() => {
        const registerUser = async () => {
            if (JSON.stringify(payLoad1) !== "{}") {
                try {

                    console.log("this is response before register api hit");
                    const response = await axios.post('https://talentproject-server.vercel.app/api/user/register', payLoad1);
                    console.log("this is response from backend", response);

                    if (response.data.value === true) {
                        navigate('/course');
                        console.log(response.data.message);
                    } else if (response.data.value === false) {


                        console.log("direct signin for the already present user")
                        const response = await axios.post('https://talentproject-server.vercel.app/api/user/login', payLoad2);

                        console.log(response.data);
                        localStorage.setItem('jwtToken', response.data.token);
                        navigate('/course');
                    }
                    else {
                        console.log(response.data.message);
                        console.error('response.data.value is false');
                    }
                } catch (error) {
                    console.error('There was an error!', error);
                }


                setPayLoad1({});
                setPayLoad2({});
            }

        };

        registerUser();
    }, [payLoad1, navigate, payLoad2]);


    return (
        <>

            <h1>Google login page</h1>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                    // console.log(credentialResponseDecoded);
                    // console.log(credentialResponseDecoded.email, credentialResponseDecoded.name, credentialResponseDecoded.sub);


                    setPayLoad1({
                        name: credentialResponseDecoded.name,
                        email: credentialResponseDecoded.email,
                        password: credentialResponseDecoded.sub
                    });

                    setPayLoad2({
                        email: credentialResponseDecoded.email,
                        password: credentialResponseDecoded.sub
                    });

                    console.log(payLoad1, payLoad2)

                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

        </>


    );
};

export default GoogleSignUp;



