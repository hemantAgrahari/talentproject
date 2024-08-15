import React from 'react';

import CoursePage from "./components/Coursepage";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/Homepage"
import Register from "./components/Register";

import Signin from "./components/Signinpage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GoogleSignUp from './components/GoogleSignup';


const router = createBrowserRouter([
    {
        path: "/",
        element: (

            <HomePage />

        ),
    },
    {
        path: "/register",
        element: (

            <Register />

        ),
    },
    {
        path: "/signin",
        element: (

            <Signin />

        ),
    },
    {
        path: "/course",
        element: (

            <CoursePage />

        ),
    },
    {
        path: "/googlelogin",
        element: (

            <GoogleSignUp />

        ),
    },
    {
        path: "*",
        element: (

            <ErrorPage />

        ),
    },

]);

export default function App() {


    return (
        <RouterProvider router={router} />
    )
}