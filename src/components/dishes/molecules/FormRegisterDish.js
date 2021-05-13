import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStorage } from "../../../contexts/StorageContext";
import { useNavigate } from "react-router";
import DishImageUploader from "./DishImageUploader";
import * as ROUTES from "../../../constants/routes";
import * as MESSAGES from "../../../constants/providers";

const FormRegisterDish = () => {
  const INITIAL_STATE = {
    name: "",
    price: "",
    category: "",
    imageRef: "",
    description: "",
  };
  const { setProduct, dishImageUrl } = useStorage();
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "The dishes must be at least 3 characters long")
        .required("The name of the dish is required"),
      price: Yup.number()
        .min(1, "You must add a number")
        .required("Price is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string()
        .min(10, "Description must be longer")
        .required("Description is required"),
    }),
    onSubmit: async (dish) => {
      try {
        dish.stock = true;
        dish.imageRef = dishImageUrl;
        await setProduct(dish);
        navigate(ROUTES.DISHES_MENU);
      } catch (error) {
        setError(MESSAGES.STORAGE_MESSAGE_ERROR);
      }
    },
  });

  return (
    <>
      {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Dish Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
            role="alert"
          >
            {/* <p className="font-bold">There was a mistake:</p> */}
            <p>{formik.errors.name} </p>
          </div>
        ) : null}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="$20"
            min="0"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.price && formik.errors.price ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
            role="alert"
          >
            <p className="font-bold">There was a mistake:</p>
            <p>{formik.errors.price} </p>
          </div>
        ) : null}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">-- Choose one --</option>
            <option value="breakfast"> Breakfast </option>
            <option value="food"> Lunch </option>
            <option value="dinner"> Dinner </option>
            <option value="drink"> Drinks </option>
            <option value="dessert"> Dessert </option>
            <option value="salad"> Salad </option>
          </select>
        </div>
        {formik.touched.category && formik.errors.category ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
            role="alert"
          >
            <p className="font-bold">There was a mistake:</p>
            <p>{formik.errors.category} </p>
          </div>
        ) : null}
        <DishImageUploader />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            id="description"
            placeholder="Description of the dish"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        {formik.touched.description && formik.errors.description ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
            role="alert"
          >
            <p className="font-bold">There was a mistake:</p>
            <p>{formik.errors.description} </p>
          </div>
        ) : null}

        <input
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
          value="Add Dish"
        />
      </form>
    </>
  );
};

export default FormRegisterDish;
