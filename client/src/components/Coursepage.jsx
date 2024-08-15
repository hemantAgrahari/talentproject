import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/Homepage.css";
import axios from 'axios';
import { IconBrandJavascript } from '@tabler/icons-react'
import { Link } from "react-router-dom";

export default function CoursePage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/course/coursedetails');
                setCourses(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('There was an error!', err.message);
            }
        };

        const token = localStorage.getItem('jwtToken');

        if (token) {
            fetchCourses();
        }



    }, [])

    return (
        <>
            <Navbar Login={false} />
            <div className="course">
                <div className="coursePageHeading">
                    <h2>Welcome to freeCodeCamp.org</h2>
                </div>
                <div className="qoute">
                    <pre>
                        "I have not failed. I've just found 10,000 ways that won't work."
                        -Thomas A. Edison
                    </pre>
                </div>
                {courses.length !== 0 ?
                    (<ul className="courselist">
                        {courses.map((course) => (

                            <li key={course._id}>
                                <div className="courseItem" style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <div>
                                        {<IconBrandJavascript />}
                                    </div>
                                    <div className="aboutCourse">{course.title} <b>Course Duration: </b>{course.duration}</div>
                                </div>
                            </li>
                        ))}

                    </ul>) :
                    <div >
                        "Login to see the course details"
                        <Link to="/signin" >Sign in</Link>

                    </div>
                }


            </div>

        </>
    )
}