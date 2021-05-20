import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";

import Input from "../../common/Input";
import FormErrorMessage from "../atoms/FormErrorMessage";
import Button from "../../common/Button";

import { useAuth } from "../../../contexts/AuthContext";
import * as ROUTES from "../../../constants/routes";

const SignUpForm = () => {
  const { setSignUp, checkUserNameExist } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("The name is required"),
      email: Yup.string()
        .email("The email is not valid")
        .required("An email is required"),
      password: Yup.string()
        .required("The password cannot be empty")
        .min(6, "The password must contain at least 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const usernameExists = await checkUserNameExist(values.name);
        if (!usernameExists.length) {
          await setSignUp(values);
          history.push(ROUTES.DASHBOARD);
        } else {
          setError("That username is already taken, please try another.");
        }
      } catch (error) {
        console.log(error);
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
            id="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <FormErrorMessage message={formik.errors.name} />
          ) : null}
        </div>
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
            placeholder="A password of at least 6 characters"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormErrorMessage message={formik.errors.password} />
          ) : null}
        </div>

        <Button type="submit">sign up</Button>
        <Button
          color="bg-gray-500 hover:bg-gray-600"
          onClick={() => history.push(ROUTES.LOGIN)}
        >
          log in
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
