import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const GoogleSignUp = () => {

    const [payLoad, setPayLoad] = useState({});
    const navigate = useNavigate();


    // console.log("this is payload", payLoad);

    useEffect(() => {
        const registerUser = async () => {
            if (JSON.stringify(payLoad) !== "{}") {
                try {
                    const response = await axios.post('http://localhost:5050/api/user/register', payLoad);
                    console.log("his is response from backend", response);

                    if (response.data.value === true) {
                        navigate('/course');
                    } else {
                        console.error('response.data.value is false');
                    }
                } catch (error) {
                    console.error('There was an error!', error);
                }


                setPayLoad({}); // Reset payLoad after the call
            }

        };

        registerUser();
    }, [payLoad, navigate]);


    return (
        <>

            <h1>Google login page</h1>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                    // console.log(credentialResponseDecoded);
                    // console.log(credentialResponseDecoded.email, credentialResponseDecoded.name, credentialResponseDecoded.sub);


                    setPayLoad({
                        name: credentialResponseDecoded.name,
                        email: credentialResponseDecoded.email,
                        password: credentialResponseDecoded.sub
                    });

                    console.log(payLoad)

                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

        </>


    );
};

export default GoogleSignUp;



