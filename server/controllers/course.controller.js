import Course from "../models/course.models.js";




export const getCourse = async (req, res) => {


    const courseDetail = await Course.find();

    res.status(200).send(courseDetail);

}


