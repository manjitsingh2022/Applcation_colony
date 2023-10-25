import React from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 dark:bg-slate-900">
            <img src="/assets/404-2.02f66548.svg" alt="" />

            <Container className="max-w-[546px] mx-auto w-full mt-12">
                <h4 className="text-slate-900 mb-4">Page not found</h4>
                <div className="dark:text-white text-base font-normal mb-10">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </div>
            </Container>

            <Container className="max-w-[300px] mx-auto w-full">
                {/* Use React Router's Link component to create a link to the homepage */}
                <Link to="/" className="btn btn-dark dark:bg-slate-800 block text-center">
                    Go to homepage
                </Link>

                {/* Alternatively, you can use a regular Bootstrap Button */}
                {/* <Button variant="dark" className="dark:bg-slate-800 block text-center">
                    Go to homepage
                </Button> */}
            </Container>
        </div>
    );
};

export default NotFound;
