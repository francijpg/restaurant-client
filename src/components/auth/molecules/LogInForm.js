import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";

import Button from "../../common/Button";
import Input from "../../common/Input";
import FormErrorMessage from "../atoms/FormErrorMessage";

import { useAuth } from "../../../contexts/AuthContext";

import * as ROUTES from "../../../constants/routes";
import * as MESSAGES from "../../../constants/providers";

const LogInForm = () => {
  const { setLogIn } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("The email is not valid")
        .required("An email is required"),
      password: Yup.string().required("The password cannot be empty"),
    }),
    onSubmit: async (values) => {
      try {
        await setLogIn(values);
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setError(MESSAGES.STORAGE_MESSAGE_ERROR);
      }
    },
  });

  return (
    <>
      {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
      <form
        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormErrorMessage message={formik.errors.email} />
          ) : null}
        </div>
        <div className="mb-4">
          <Input
            type="password"
            id="password"
            placeholder="******"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormErrorMessage message={formik.errors.password} />
          ) : null}
        </div>

        <Button type="submit">log in</Button>
        <Button
          color="bg-gray-500 hover:bg-gray-600"
          onClick={() => history.push(ROUTES.SIGN_UP)}
        >
          sign up
        </Button>
      </form>
    </>
  );
};

export default LogInForm;
