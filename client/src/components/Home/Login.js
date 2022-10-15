import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import api from '../../services/api';

export default function Login() {

  const [apiMessage, setApiMessage] = useState({ type: '', message: '' });
  const history = useHistory();

  return (
    <div className="form-content">
      <span className="form-title">Login</span>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          api.post("auth/authenticate", {
            email: values.email,
            password: values.password
          })
            .then(() => {
              setSubmitting(false);
              history.push("/projects");
            })
            .catch((err) => {
              setSubmitting(false);
              setApiMessage({ type: 'error', message: err.response.data.error });
            });
          setTimeout(() => {
            setApiMessage({ type: '', message: '' });
          }, 5000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              {apiMessage.type && <span className={apiMessage.type === 'error' ? 'notification notification-error' : 'notification notification-success'}>{apiMessage.message}</span>}
              <input
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required={errors.email && touched.email && errors.email}
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required={errors.password && touched.password && errors.password}
              />
              {isSubmitting ?
                <button>
                  <i className="fa fa-circle-o-notch fa-spin"></i>Loading
                </button>
                :
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              }
            </form>
          </>
        )}

      </Formik>
    </div>
  )
}