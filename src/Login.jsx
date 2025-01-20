import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Todo from "./Todo";
import { LoginValidationSchema } from "./assets/loginSchema";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginValidationSchema,
    onSubmit: async (values, action) => {
      try {
        console.log("Submitting with values:", values);

        const response = await axios.post(
          "http://localhost:2026/api/login",
          values
        );

        console.log("API Response:", response.data); // Check if this log works
        const token   = response.data.accessToken    // Assuming the token is returned as "token"
        // Save the JWT token to localStorage
        localStorage.setItem("authToken",token)
        // setDetails([res.data])
        action.resetForm();
        setIsLogin(true);
        
        navigate("/todolist");
       
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setFieldError("Invalid email or password. Please try again.");
        } else {
          setFieldError("An error occurred. Please try again later.");
        }
      }
    },
  });

  return (
    <div>
      {isLogin ? (
        <Todo />
      ) : (
        <div className="flex min-h-full flex-col justify-center px-14 py-10 drop-shadow-xl shadow-orange-100 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-lg brightness-110">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-3xl font-bold tracking-tight font-sans">
              Login
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6 "
              onSubmit={handleSubmit}
              action="#"
              method="POST"
            >
              <div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    autoComplete="off"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="block w-full  bg-black w-64  bg-transparent px-2 py-1.5 text-base text-white font-medium border-b-2 placeholder:text-white outline-none "
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
                    placeholder="Enter Your Password"
                    autoComplete="off"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="block w-full  bg-black w-64  bg-transparent px-2 py-1.5 text-base text-white font-medium border-b-2 placeholder:text-white outline-none "
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
                  // type="button"
                  className="flex w-full mt-10 justify-center rounded-3xl bg-orange-600 px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-orange-500 boder-none focus:border-none hover:border-none"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-100">
              Not a member?
              <Link
                to="/"
                className="font-semibold text-orange-600 hover:text-orange-500"
              >
                Please Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
