import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import "../styles/Homepage.css";

import { IconBrandAppleFilled, IconBrandGoogleFilled, IconBrandSpotifyFilled, IconBrandAmazon, IconBrandWindows } from '@tabler/icons-react'
export default function HomePage() {


    const navigate = useNavigate();
    const handleButtonClick = () => {

        navigate('/signin');
    };

    return (
        <>
            <Navbar />
            <div className="home">
                <h1> Learn to code -for free.</h1>
                <h1>Buid projects.</h1>
                <h1>Earn certifications.</h1>
                <p>Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten jobs at tech comapnies including:</p>
                <div className="icons">
                    {<IconBrandAppleFilled />} Apple
                    {<IconBrandGoogleFilled />} Google
                    {<IconBrandWindows />} Microsoft
                    {<IconBrandSpotifyFilled />} Spotify
                    {<IconBrandAmazon />} Amazon
                </div>

                <div className="button-container">
                    <button className="btn" onClick={handleButtonClick}>Get Started (it's free)</button>
                </div>
            </div >

        </>
    )
}