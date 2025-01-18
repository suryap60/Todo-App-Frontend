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

    const handleChange = (e) => {

        const temp = {}
        temp[e.target.name] = e.target.value
        setFormData({
            ...formData,
            temp
        });
    };

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignIn;
