import React, { useState } from 'react';
import { Formik } from 'formik';
import api from '../../services/api';

export default function Register() {

  const [apiMessage, setApiMessage] = useState({ type: '', message: '' });

  return (
    <div className="form-content">
      <span className="form-title">User Registration</span>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          } else if (!values.email) {
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
          api.post("auth/register", {
            name: values.name,
            email: values.email,
            password: values.password
          })
            .then(() => {
              setApiMessage({ type: 'success', message: 'User Created' })
              setSubmitting(false);
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
                placeholder="Name"
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                required={errors.name && touched.name && errors.name}
              />
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
                  <i className="loading-icon-margin fa-circle-o-notch fa-spin"></i>Loading
                </button>
                :
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              }
            </form>
          </>
        )}

      </Formik>
    </div>
  )
}