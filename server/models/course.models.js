import { Schema, model } from "mongoose";


const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [3, 'Min 3 characters are required!'],
        maxLength: [20, 'Max 20 characters are allowed!'],
        trim: true,
        lowercase: true
    },
    duration: {
        type: String,
        required: [true, 'Duration is required!'],
        trim: true,
        lowercase: true,

    }

});




const Course = model('course', CourseSchema);
export default Course