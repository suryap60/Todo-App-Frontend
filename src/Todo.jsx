import axios from "axios"
import { useEffect, useState } from "react"
import './App.css'
  
const Todo = ()=>{
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('')
    const [todos,setTodos] = useState([])
    const [editIndex,setEditIndex] = useState(null)

    // Fetch todos when the component mounts
    useEffect(()=>{
        const fetchToken = async()=>{
           const token = localStorage.getItem("authToken");
           if(!token){
            console.log("No token found, redirecting to login...");
            // Redirect to login if no token is found
            window.location.href='/login'
            // navigate('/login')
           }else{
            try{
                const res = await axios.get("http://localhost:2026/api/getTodos", {
                    headers: { authorization : `Bearer ${token}` },
                  });
                  console.log(res)
                  console.log("Response Data:", res.data);
                  setTodos(res.data.todos);
            }
            catch(error){
                console.log("error",error)
            }
           }
        }

        fetchToken();
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const token = localStorage.getItem("authToken")
        if(!token){
            window.location.href = "/login";
        }
        else{
            try{
                if(editIndex !==null){
                    
                    const todoToUpdate = todos[editIndex];
                    // console.log('payload:',{title,description})
                    await axios.put(`http://localhost:2026/api/update/${todoToUpdate._id}`,{title,description},
                        { headers: { authorization : `Bearer ${token}` }}
                    )

                    // Update the todo in the state after successful update
                    const updateTodos =todos.map((todo,index)=>
                        index === editIndex? {title,description} :todo
                    )

                    setTodos(updateTodos)

                     // Reset edit state and input fields
                    setEditIndex(null)
                    setTitle('');
                    setDescription('');
                }else{
                    const newTodo = {title,description}
                    await axios.post('http://localhost:2026/api/todo', newTodo, {
                        headers: {
                          'authorization': `Bearer ${token}` // Ensure the token is correct here
                        }
                      })
                      setTodos([...todos,newTodo])
                      setTitle('');  // Reset input fields
                      setDescription('')  // Reset input fields
                
                }

                


            }
            catch(error){
                console.log("error",error)
            }
        }
    }

    const handleEdit = (index)=>{
        const todo = todos[index]
        setTitle(todo.title)
        setDescription(todo.description)
        setEditIndex(index) // Set edit index to enable update mode
    }

    const handleDelete = async(index)=>{
        try{
            const todoDelete = todos[index]

            // Make DELETE request to remove the todo from backend
            const token = localStorage.getItem('authToken')
            await axios.delete(`http://localhost:2026/api/delete/${todoDelete._id}`, {
                headers: { authorization : `Bearer ${token}` }
            });

             // Remove the todo locally (or set deleted to true)
             const updateTodos = todos.map((todo,todoIndex)=>
                todoIndex === index ? {...todo, deleted:true} :todo
    
            )
            setTodos(updateTodos)

            console.log(
                "deleted successfully"
            )
        }
        catch(error){
            console.log("error",error.message)
        }
    } 



    return(
        <div className="min-h-screen ">
        
            <div className="flex flex-col md:flex-row justify-between gap-6" >

                <div className="container p-6 rounded-lg shadow-lg max-w-2xl w-full md:w-[40%] mt-[-10px] bg-gradient-to-b from-slate-800 to-white-500">
                    <h2 className="text-3xl text-white font-bold text-center mb-6">Todo List</h2>
                    <div >
                        {todos.map((todo,index)=>{
                            return(
                                <div className={`container bg-stone-50 rounded-lg shadow-lg ${todo.deleted ? "todo-deleted" : ""}`} key={index}>
                                    <h3 className="text-xl font-bold mb-3 mt-9 pt-5">{todo.title}</h3>
                                    <p className="text-l mb-6">{todo.description}</p>
                                    <div className="flex justify-between">
                                        <button className="bg-red-600 ms-6 mb-4 text-white hover:bg-red-400 focus:bg-red-900" onClick={()=>handleEdit(index)} disabled={todo.deleted}>Update</button>
                                        <button className="bg-green-600 me-6 mb-4 text-white hover:bg-green-400 focus:bg-green-900" onClick={()=>handleDelete(index)} disabled={todo.deleted}>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                </div>
                
                <div className="container p-6 bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full md:w-[60%] mt-[-10px] h-[250px]">
                    <h2 className="text-3xl font-bold text-center mb-6 text-white">Todo App</h2>

                    <form action="" onSubmit={handleSubmit}>
                        <div  className="flex items-end space-x-6">

                            <div className="w-1/3">
                                <label  className="block text-sm font-medium text-gray-700 text-white">Title</label>

                                <input
                                type="text" 
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)} 
                                required 
                                className="mt-1 px-6 py-4 border rounded-lg w-full text-lg bg-gray-100"/>
                        
                            </div>

                
                            <div className="w-1/3">
                                <label className="block text-sm font-medium text-gray-700 text-white">Description</label>

                                <input
                                type="text"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                required 
                                className="mt-1 px-6 py-4 border rounded-lg w-full text-lg bg-gray-100"/>
                            
                            </div>

                
                            <div className="w-1/3">
                                <button type="submit" className="px-8 py-4 bg-sky-600 text-white rounded-md hover:bg-sky-500 text-xl">
                                    {editIndex !== null ? 'Update':'Submit'}
                                </button>

                            </div>
                        
                        </div>
                    
                    </form>
            
                        
                    
                </div>
            </div>
        </div>
    )
}
export default Todo

                


               