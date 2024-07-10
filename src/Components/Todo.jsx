import { useState, useEffect } from "react";
import { db, auth, storage } from "../Config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const Todo = () => {
    const [todos, setTodos] = useState([])
    const todosRef = collection(db, 'todo')

    const [task, setTask] = useState('')
    const [time, setTime] = useState()
    const [isDone, setIsDone] = useState(true)

    //file upload state
    const [fileUpload, setFileUpload]= useState(null)

    const getTodos= async()=>{
        try{
            const response = await getDocs(todosRef)
            const data = response.docs.map((doc)=>({...doc.data(),
                id: doc.id
            }))
            setTodos(data)
            console.log(todos)
        }catch(err){
            console.error(err)
        }
      }
    useEffect(() => {
      getTodos()
    
    }, [])
    const addTask= async()=>{
        try{
            await addDoc(todosRef,{
                title:task,
                time:time,
                done:isDone,
                userId: auth?.currentUser?.uid
            })
            getTodos()
        }catch(err){
            console.error(err)
        }
    }
    const deleteTask=async(id)=>{
        const task = doc(db, 'todo', id)
        await deleteDoc(task)
    }

    const uploadFile=async()=>{
        if(!fileUpload)return;
        const filesFolderRef = ref(storage, `todoFiles/${fileUpload.name}`)
        try{
            await uploadBytes(filesFolderRef, fileUpload)
        }catch(err){
            console.error(err)
        }
    }
    
  return (
    <>
        <div className="m-4">
            <input className="border-2 rounded-md mr-2 px-2" type="text"  placeholder="enter todo" onChange={(e)=>setTask(e.target.value)}/>
            <input className="border-2 rounded-md mx-2 pl-2" type="number" min={1} max={24} onChange={(e)=>setTime(Number(e.target.value))} />
            <span className="inline-flex justify-center align-middle">
                <input type="checkbox" id="done" className="cursor-pointer" onChange={(e)=>setIsDone(e.target.checked)} checked={isDone}/>
                <label htmlFor="done">Done?</label>
            </span>
            <button className="text-white ml-2 text-sm px-2 py-1 rounded-md bg-blue-700 hover:bg-blue-600" onClick={addTask}>Add Task</button>
        </div>
        <div className="m-4">
            {todos.map((todo)=>(
            <div key={todo.id}>
                <h1 className={todo.done?'text-green-600 text-xl ':'text-red-600 text-xl'}>{todo.title} <span>: {todo.time}pm</span></h1>
                <button onClick={()=>deleteTask(todo.id)&&getTodos()} className="border-2 rounded-md text-sm p-1 bg-red-500 inline-block">Delete</button>
            </div>
            ))}
        </div>
        <div>
            <input type="file" onChange={(e)=>setFileUpload(e.target.files)} />
            <button onClick={uploadFile}>Upload File</button>
        </div>
    </>
  )
}

export default Todo