import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ValidationSchema } from "./assets/ValidationSchema";
import { useState } from "react";
import Todo from "./Todo";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:2026/api/login", values);
        const token = res.data.accessToken;
        localStorage.setItem("authToken", token);
        navigate('/todolist');
      } catch (error) {
        setLoginError('Invalid credentials. Please try again.');
      }
    }
  });

  return (
    <div>
      {isLogin ? (
        <Todo />
      ) : (
        <div className="flex min-h-full flex-col justify-center px-14 py-10 drop-shadow-xl shadow-orange-100 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-lg brightness-110">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-3xl font-bold tracking-tight font-sans">Login</h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    className="block w-full bg-black w-64 bg-transparent px-2 py-1.5 text-base text-white font-medium border-b-2 placeholder:text-white outline-none"
                  />
                  {errors.email && touched.email ? (
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
                    className="block w-full w-64 mt-10 bg-transparent px-2 py-1.5 text-base text-white font-medium bg-black border-b-2 placeholder:text-white outline-none"
                  />
                  {touched.password && errors.password ? (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  ) : null}
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm mt-2">
                    <a href="#" className="font-semibold text-gray-900 hover:text-gray-700 justify-end">Forgot password?</a>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full mt-10 justify-center rounded-3xl bg-orange-600 px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-orange-500 border-none focus:border-none hover:border-none"
                >
                  Sign in
                </button>
              </div>
            </form>

            {loginError && <div className="text-red-500 text-center mt-4">{loginError}</div>}

            <p className="mt-10 text-center text-sm/6 text-gray-100">
              Not a member? 
              <Link to="/" className="font-semibold text-orange-600 hover:text-orange-500"> Please Sign Up</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
