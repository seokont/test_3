import logo from "./logo.svg";
import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import img from "./assets//img/image.png";
import React, { useEffect, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    user: "",
    account_name: "",
    verification_code: "",
    promotions: false,
    terms: false,
    privacy: false,
  };

  const validationSchema = Yup.object({
    user: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "8 characters minimun").required("Required"),
    account_name: Yup.string().required("Visible nickname for your profile"),
    verification_code: Yup.string()
      .matches(/^\d{6}$/, "Verification code must be exactly 6 digits")
      .required("Verification code is required"),
    promotions: Yup.boolean()
      .required("Please indicate whether you want to receive promotions.")
      .oneOf([true], "You must accept promotions to continue."),
    terms: Yup.boolean()
      .required("Please indicate whether you want to receive promotions.")
      .oneOf([true], "You must accept promotions to continue."),
    privacy: Yup.boolean()
      .required("Please indicate whether you want to receive promotions.")
      .oneOf([true], "You must accept promotions to continue."),
  });

  const onSubmit = (values) => {
    console.log("Form data:", values);
  };

  const startCountdown = () => {
    setSeconds(60);
    setIsActive(true);
  };

  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(timer);
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  return (
    <div className="App">
      <div className="container">
        <div className="left-section">
          <div className="brand">Nick Mine Inc.</div>
          <div className="logo"></div>
        </div>
        <div className="right-section">
          <div className="right-section-form">
            <div className="flag-uk">
              <img src={img} />
            </div>
          </div>
          <div className="form-container">
            <h1>
              Create an account<span>.</span>
            </h1>
            <h4>
              Already have an account? <span>Sign in</span>
            </h4>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="user">User ID</label>
                    <div className="group-input">
                      <div className="icon user"></div>
                      <Field type="text" id="user" name="user" />
                    </div>
                    <ErrorMessage
                      name="user"
                      component="div"
                      className="error-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <div className="group-input">
                      <div className="icon password"></div>
                      <Field type="password" id="password" name="password" />
                    </div>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="account_name">Account Name</label>
                    <div className="group-input">
                      <div className="icon name"></div>
                      <Field
                        type="text"
                        id="account_name"
                        name="account_name"
                      />
                    </div>

                    <ErrorMessage
                      name="account_name"
                      component="div"
                      className="error-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="group-input">
                      <div className="icon mail"></div>
                      <button onClick={startCountdown} disabled={isActive}>
                        Resend { isActive ? `(${seconds}s)` : ''}
                      </button>
                      <Field type="email" id="email" name="email" />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="verification_code">Verification Code</label>
                    <div className="group-input">
                      <div className="icon mail"></div>
                      <Field
                        type="text"
                        id="verification_code"
                        name="verification_code"
                      />
                    </div>
                    <ErrorMessage
                      name="verification_code"
                      component="div"
                      className="error-input"
                    />
                  </div>
                  <div className="form-check">
                    <Field type="checkbox" id="terms" name="terms" />
                    <label htmlFor="terms">
                      [Required] I read the <a href="#">Terms of Service</a> and
                      agree to the terms.
                    </label>
                  </div>
                  <div className="form-check">
                    <Field type="checkbox" id="privacy" name="privacy" />
                    <label htmlFor="privacy">
                      [Required] I read the <a href="#">Privacy Policy</a> and
                      agree to the terms.
                    </label>
                  </div>
                  <div className="form-check">
                    <Field type="checkbox" id="promotions" name="promotions" />

                    <label htmlFor="promotions">
                      [Optional] I would like to receive promotional emails.
                    </label>
                  </div>
                  <button type="submit" className="btn">
                    Create Account
                  </button>
                </Form>
              )}
            </Formik>
            <div className="footer">
              <div className="promo-code">
                <div></div>
                Have Promo Code?
              </div>
              <div className="contact-support">Contact Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
