import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const sample = {
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(sample);
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Make the login request
            const response = await axios.post('http://localhost:2026/api/login', formData);

            const token = response.data.accessToken; // Access token returned in the response
            localStorage.setItem('authToken', token); // Store the token in localStorage

            setDetails([response.data]); // Optionally, store the user details

            // Step 2: Navigate to the To-Do List page
            navigate('/todolist'); // Redirect to the To-Do List page after successful login
        } catch (error) {
            console.error("Error during login", error);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-14 py-10 drop-shadow-xl shadow-orange-100 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-lg brightness-110">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-1 text-center text-3xl font-bold tracking-tight font-sans">Login</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">

            <form onSubmit={handleSubmit} className="space-y-6 ">
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="block w-full  bg-black w-64  bg-transparent px-2 py-1.5 text-base text-white font-medium border-b-2 placeholder:text-white outline-none "
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="block w-full  bg-black w-64  bg-transparent px-2 py-1.5 text-base text-white font-medium border-b-2 placeholder:text-white outline-none "
                />
                <button 
                    type="submit"
                     className="flex w-full mt-10 justify-center rounded-3xl bg-orange-600 px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-orange-500 boder-none focus:border-none hover:border-none">
                    Sign in
                </button>


            </form>
            </div>
            </div>
        
    );
};

export default SignIn;
