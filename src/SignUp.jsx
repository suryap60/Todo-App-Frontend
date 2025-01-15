import axios from "axios"
import { useState } from "react"
import './SignUp.css'
import { Link } from "react-router-dom"


const SignUp = ()=>{

    const sample ={
        userName:'',
        email:'',
        password:'',
    }

    const [formData,setFormData] = useState(sample)
    

    const validPassword = (password)=>{
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
        return passwordPattern.test(password)
    }
    
    const validEmail = (email)=>{
        const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        return emailPattern.test(email) 
    }

    const handleChange =(e)=>{
        let temp ={}
        temp[e.target.name] = e.target.value
        setFormData({...formData,...temp})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            
        if(!validEmail(formData.email)){
            return alert("Please Enter a validate email")
        }

        if(!validPassword(formData.password)){
            return alert("Password must be between 8 and 20 characters long, contain at least one letter, one number, and one special character")
        }

        const res = await axios.post("http://localhost:2026/api/register",formData)
        console.log(res.data)
        alert("Account Created Successfully")
        setFormData(sample)
        }
        
        catch(error){
            console.log("error",error)
        }
        
    }
   

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-zinc-800 bg-slate-100 rounded-2xl drop-shadow-md w-full max-w-4xl mx-auto min-w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign Up to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <form className="space-y-6 " onSubmit={handleSubmit} action="#" method="POST">

                <div>
                    
                    <div className="mt-2">
                        <input type="text" placeholder="Enter Your UserName" name="userName" value={formData.userName} onChange={handleChange} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    
                    <div className="mt-2">
                        <input type="email" placeholder="Enter Valid Email" name="email" value={formData.email} onChange={handleChange} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    
                    <div className="mt-2">
                        <input type="password" placeholder="Enter valid password" name="password" value={formData.password} onChange={handleChange} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
            Already Registered?
            <Link to="/login" class="font-semibold text-green-600 hover:text-green-500">Please Sign In</Link>
            </p>

            </div>
        </div>
    )

}

export default SignUp

{/* <div className="signup-container">
            <h1 className="signup-header">Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input className="input-box" type="text" placeholder="Enter Your UserName" name="userName" value={formData.userName} onChange={handleChange} required/> <br />
                <input className="input-box" type="email" placeholder="Enter Valid Email" name="email" value={formData.email} onChange={handleChange} required/> <br />
                <input className="input-box" type="password" placeholder="Enter valid password" name="password" value={formData.password} onChange={handleChange} required/> <br />
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div> */}