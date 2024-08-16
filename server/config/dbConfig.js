import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectToDatabase = async () => {
    try {
        const { connection } = await mongoose.connect(`mongodb+srv://hemant11102219:
            ${process.env.DATABASE_PASSWORD}@cluster0.ojlnq2k.mongodb.net/assignment?retryWrites=true&w=majority&appName=Cluster0`);

        // console.log(connection);

        if (connection) {
            console.log(`Connected to database ${connection.host}`);
        }
    } catch (e) {
        console.log(e);
    }
}

export default connectToDatabase;