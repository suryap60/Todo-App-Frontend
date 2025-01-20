import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [todos, setTodos] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
  const [response, setResponse] = useState([]);

  //create reference for form
  const formRef = useRef(null);
  const submitRef = useRef([]);
  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("No token found, redirecting to login...");
        // Redirect to login if no token is found
        window.location.href = "/login";
        // navigate('/login')
      } else {
        try {
          const res = await axios.get("http://localhost:2026/api/getTodos", {
            headers: { authorization: token },
          });
          //   console.log(res)
          //   console.log("Response Data:", res.data);
          setTodos(res.data.todos);
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    fetchToken();
  }, [submitRef]);

  console.log(response);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/login";
    } else {
      try {
        if(editId){
          
          // We're in update mode
          const response = await axios.put(
            `http://localhost:2026/api/update/${editId}`,
            { title, description },
            { headers: { authorization: token } }
          );

          setTodos(response.data.todo);

          // Reset edit state and input fields
          setEditId(null);
          setTitle("");
          setDescription("");
          submitRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          // We're in create mode
          const newTodo = { title, description };
          const response = await axios.post(
            "http://localhost:2026/api/todo",
            newTodo,
            {
              headers: {
                authorization:token, // Ensure the token is correct here
              },
            }
          );
            console.log(response.data.todo)
            // Update the todos state with the new todo
         setTodos( response.data.todo);
            
        //   setResponse(response.data.todo.todo);
          setTitle(""); // Reset input fields
          setDescription(""); // Reset input fields
          
          submitRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id); // Set edit index to enable update mode

    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDelete = async (id) => {
    try {
      // Make DELETE request to remove the todo from backend
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:2026/api/delete/${id}`, {
        headers: { authorization:token },
      });

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo._id !== id);
      });

      console.log("deleted successfully");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleCompleted = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.put(
        `http://localhost:2026/api/complete/${id}`,{},
        {
          headers: { authorization: token },
        }
      );

      const updatedTodos = todos.map(todo =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      );
      
      // Set the updated todos state
      setTodos(updatedTodos);

    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="container p-6 rounded-lg shadow-lg max-w-2xl w-full md:w-[35%] mt-[-10px] bg-gradient-to-b from-slate-800 to-white-500">
          <h2 className="text-3xl text-white font-bold text-center mb-6">
            Todo List
          </h2>
          <div>
            {todos?.map((todo, index) => {
              return (
                <div
                  className="container bg-stone-50 rounded-lg shadow-lg mb-6"
                  key={index}
                >
                  <div className="flex  ps-5 items-center">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      checked={todo.completed}
                      onChange={() => handleCompleted(todo?._id)}
                      className="me-10 mt-12 transform scale-125 transition-all duration-300 cursor-pointer hover:scale-130"
                    />

                    <h3
                      ref={submitRef}
                      className={`text-xl font-bold mb-3 ms-5 mt-9 pt-5 ${
                        todo.completed ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </h3>
                  </div>
                  <p
                    className={`text-l mb-6 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                  <div className="flex justify-between">
                    <button
                      className="bg-red-600 ms-6 mb-4 text-white hover:bg-red-400 focus:bg-red-900"
                      onClick={() => handleEdit(todo)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-green-600 me-6 mb-4 text-white hover:bg-green-400 focus:bg-green-900"
                      onClick={() => handleDelete(todo?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={formRef}
          className="container p-6 bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full md:w-[60%] mt-[-10px] h-[250px]"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Todo App
          </h2>

          <form action="" onSubmit={handleSubmit}>
            <div className="flex items-end space-x-6">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-200 text-white">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 px-6 py-4 border rounded-lg w-full text-lg bg-gray-100"
                />
              </div>

              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-200 text-white">
                  Description
                </label>

                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 px-6 py-4 border rounded-lg w-full text-lg bg-gray-100"
                />
              </div>

              <div className="w-1/3">
                <button
                  type="submit"
                  className="px-8 py-4 bg-sky-600 text-white rounded-md hover:bg-sky-500 text-xl"
                >
                  {editId ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Todo;
