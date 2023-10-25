// Register.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { clearMessage } from "../redux/slices/message";
import { registerOnly } from "../redux/actions/authAction";

const Register = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    let navigate = useNavigate();
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValues) => {
        const { name, email, password } = formValues;
        setSuccessful(false);

        dispatch(registerOnly({ name, email, password }))
            .then(() => {
                setSuccessful(true);
                toast.success("Registration Successful...");
                // Reload the page to navigate to the login page
                navigate("/login");
                window.location.reload();
            })
            .catch(() => {
                setSuccessful(false);
            });
    };


    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="container-fluid my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <img
                                className="mb-4"
                                src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                                alt=""
                                width="72"
                                height="57"
                            />
                            <h2 className="card-title text-center mb-4">Please sign up</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleRegister}
                            >
                                <Form autoComplete="off">
                                    {!successful && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="name">Username</label>
                                                <Field name="name" type="text" className="form-control" />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field name="email" type="email" className="form-control" />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </div>

                                            <div className="form-group text-center d-grid mt-4">
                                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                            </div>

                                            <div className="text-center mt-2">
                                                Already have an account?{" "}
                                                <span onClick={() => navigate("/login")} className="text-primary">
                                                    Login
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </Formik>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div
                                    className={successful ? "alert alert-success" : "alert alert-danger"}
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
