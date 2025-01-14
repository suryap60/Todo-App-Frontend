import axios from "axios"
import { useEffect, useState } from "react"
  
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
            // Redirect to login if no token is found
            window.location.href='/login'
           }else{
            try{
                const res = await axios.get("http://localhost:2022/api/getTodos", {
                    headers: { Authorization: `Bearer ${token}` },
                  });
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
                    const updateTodos =todos.map((todo,index)=>
                        index === editIndex? {title,description} :todo
                    )
                    setTodos(updateTodos)
                    const todoToUpdate = todos[editIndex];
                    // console.log('payload:',{title,description})
                    await axios.put(`http://localhost:2022/api/update/${todoToUpdate.id}`,{title,description},
                        { headers: { Authorization: `Bearer ${token}` }}
                    )
                    setEditIndex(null)
                }else{
                    setTodos([...todos,{title,description}])
                    await axios.post('http://localhost:2022/api/todo', {title,description},
                        { headers: { Authorization: `Bearer ${token}` }}
                    );
                
                }

                setTitle('');
                setDescription('')


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

            // Remove the todo locally (or set deleted to true)
            const updateTodos = todos.map((todo,todoIndex)=>
                todoIndex === index ? {...todo, deleted:true} :todo
    
            )
            setTodos(updateTodos)

            // Make DELETE request to remove the todo from backend
            const token = localStorage.getItem('authToken')
            await axios.delete(`http://localhost:2022/api/delete/${todoToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(
                "deleted successfully"
            )
        }
        catch(error){
            console.log("error",error.message)
        }
    } 



    return(
        <div className="flex flex-col md:flex-row justify-between gap-6" >

            <div className="container p-6 rounded-lg shadow-lg max-w-3xl w-full md:w-[30%] mt-[-10px]">
                <h2 className="text-3xl font-bold text-center mb-6">Todo List</h2>
                <div>
                    {todos.map((todo,index)=>{
                        return(
                            <div className="container bg-gray-100 rounded-lg shadow-lg" key={index}>
                                <h3 className="text-xl font-bold mb-3 mt-9 pt-5">{todo.title}</h3>
                                <p className="text-l mb-6">{todo.description}</p>
                                <div className="flex justify-between">
                                    <button className="bg-red-600 ms-6 mb-4 text-white hover:bg-red-400 focus:bg-red-900" onClick={()=>handleEdit(index)}>Update</button>
                                    <button className="bg-green-600 me-6 mb-4 text-white hover:bg-green-400 focus:bg-green-900" onClick={()=>handleDelete(index)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>
            
            <div className="container p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl w-full md:w-[60%] mt-[-10px]">
                <h2 className="text-3xl font-bold text-center mb-6">Todo App</h2>

                <form action="" onSubmit={handleSubmit}>
                    <div  className="flex items-end space-x-6">

                        <div className="w-1/3">
                            <label  className="block text-sm font-medium text-gray-700">Title</label>

                            <input
                             type="text" 
                             value={title}
                             onChange={(e)=>setTitle(e.target.value)} 
                             required 
                             className="mt-1 px-6 py-4 border rounded-lg w-full text-lg"/>
                       
                        </div>

            
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Description</label>

                            <input
                             type="text"
                             value={description}
                             onChange={(e)=>setDescription(e.target.value)}
                             required 
                             className="mt-1 px-6 py-4 border rounded-lg w-full text-lg"/>
                        
                        </div>

            
                        <div className="w-1/3">
                            <button type="submit" className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-xl">
                                {editIndex !== null ? 'Update':'Submit'}
                            </button>

                        </div>
                    
                    </div>
                
                </form>
        
                    
                
            </div>
         </div>
    )
}
export default Todo

                


               