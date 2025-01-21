import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { ValidationSchema } from "./assets/ValidationSchema";
import { useState } from "react";

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema, // <-- This is where the validate function is passed
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(
          "http://localhost:2026/api/register",
          values
        );
       
        // alert("Account created Successfully")
        setIsSignUp(true);
        action.resetForm();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          const errorMessage =
            error.response.data.message || "*This email is already registered";
          setFieldError("email", errorMessage); // Set field-level error for email
        } else {
          // Handle other types of errors here (e.g., server errors, etc.)
          setFieldError(
            "email",
            "There was an error while creating your account. Please try again."
          );
        }
      }
    },
  });

  return (
    <div>
      {isSignUp ? (
        <div className=" px-10 py-10 drop-shadow-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
          <h1 className="text-md fond-bold text-white mt-5 font-sans pb-10">
            SUCCESS!
          </h1>

          <p className="font-semibold text-2xl font-sans mt-5 tracking-wider text-blue-950">
            Congratulation,your account <br />
            has been successfully created
          </p>
          <button className="mt-10 rounded-3xl px-10 font-sans hover:border-none  tracking-wider mt-14 mb-6 font-bold">
            <Link to={"/login"} className="text-black hover:text-blue-600">
              Continue
            </Link>
          </button>
        </div>
      ) : (
        <div className="bg-white px-10 py-10 drop-shadow-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="sm:max-auto sm:w-full sm:max-w-sm ">
            <h2 className="font-bold  text-3xl pb-7">Create new account</h2>
          </div>

          <div className="tracking-tight">
            <form onSubmit={handleSubmit} action="#" method="POST">
              <div>
                <div className="mt-2 ">
                  <input
                    type="text"
                    placeholder="Enter Your UserName"
                    autoComplete="off"
                    autoSave="off"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="block w-full rounded-md bg-white px-3 py-2.5 focus:outline-green-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline focus:outline-none sm:text-sm/6"
                  />
                  {touched.userName && errors.userName ? (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.userName}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Enter Valid Email"
                    autoComplete="off"
                    autoSave="off"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="block w-full rounded-md bg-white px-3 py-2.5 focus:outline-green-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline mt-7 focus:outline-none sm:text-sm/6"
                  />

                  {touched.email && errors.email ? (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Enter valid password"
                    autoComplete="off"
                    autoSave="off"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="block w-full rounded-md mt-7 bg-white px-3 py-2.5 focus:outline-green-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline focus:outline-none sm:text-sm/6"
                  />
                  {touched.password && errors.password ? (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                //   type="submit"
                  autoSave="off"
                  className="flex w-full justify-center mt-9 rounded-3xl bg-green-600 px-3 py-1.5  text-md font-semibold text-white  hover:bg-green-500 hover:border-none"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 font-bold text-gray-100">
              Already have an account ?
              <Link
                to="/login"
                className="text-green-950 font-semibold hover:text-blue-800 hover:underline"
              >

                Sign In now
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
