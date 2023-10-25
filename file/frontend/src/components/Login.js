import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../redux/slices/message";
import { toast } from "react-toastify";
import { login } from "../redux/actions/authAction";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const message1 = useSelector((state) => state);
    console.log('first', message1)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValues) => {
        const { email, password, rememberMe } = formValues;
        setLoading(true);

        dispatch(login({ email, password, rememberMe }))
            .unwrap()
            .then(() => {
                navigate("/");
                window.location.reload();
                toast.success("Login Successful...");
            })
            .catch(() => {
                setLoading(false);
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
                            <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                            <h2 className="card-title text-center mb-4">Please sign in</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleLogin}

                            >
                                <Form autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"

                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-check text-start my-3">
                                        <Field
                                            type="checkbox"
                                            id="rememberMe"
                                            name="rememberMe"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="rememberMe" className="form-check-label">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="form-group text-center mt-4 d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Login</span>
                                        </button>
                                    </div>

                                    <div className="text-center mt-2">
                                        {/* Don't have an account?{" "} */}
                                        {/* <span
                                            onClick={() => navigate("/register")}
                                            className="text-primary"
                                        >
                                            Signup
                                        </span> */}
                                    </div>
                                </Form>
                            </Formik>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
