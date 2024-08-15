import { Link } from 'react-router-dom';

const ErrorPage = () => {


    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column"
            }}>
                <h1>Error page 404</h1>
                <h1> <Link to="/">Go to Home page</Link>
                </h1>
            </div>
        </>
    );
}

export default ErrorPage;
