import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = ()=>{

    const sample ={
        email:'',
        password:'',
    }

    const [formData,setFormData] = useState(sample)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        let temp ={};
        temp[e.target.name] = e.target.value
        setFormData({...formData,...temp})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{

            const res = await axios.post("http://localhost:2022/api/login",formData)
            console.log(res.data)

            const { email ,password } = res.data;
            

            // if(email !== formData.email){
            //     alert("Invalid EmailId")
            //     return
            // }

            // if(password !==formData.password){
            //    alert("Invalid Password")
            //    return
            // }

            const { token }  = res.data

            // Save the JWT token to localStorage
            localStorage.setItem("authToken",token)

            navigate('/todolist')

        }
        catch(error){
            console.log("error",error)
        }
    }

    return(
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-zinc-800 bg-slate-100 rounded-2xl drop-shadow-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6 " action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                    <div className="mt-2">
                        <input type="text" placeholder="Enter Your Email" name="email" value={formData.email} onChange={handleChange} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>

                    <div className="mt-2">
                        <input type="text" placeholder="Enter Your Password" name="password" value={formData.password} onChange={handleChange} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"/>
                    </div>

                    <div className="flex items-center justify-end">
                        
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-gray-600 hover:text-orange-950 justify-end">Forgot password?</a>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ">Sign in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?
            <Link to="/register" class="font-semibold text-orange-600 hover:text-orange-500">Please Sign Up</Link>
            </p>

            </div>
        </div>

    )
}

export default Login
