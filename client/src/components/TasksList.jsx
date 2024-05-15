import { useNavigate } from "react-router-dom"
// useEffect utilizado para, 
import { useEffect, useState } from "react"
// se importa a task.api.js para hacer la peticion a la bbdd del bckend
import { getAllTasks } from '../api/task.api'

export default function TaskList(){
    const navigate = useNavigate()
    // useState() se utiliza para mostrar las tareas yse le asigna un valor vacio
    const [tasks, setTasks] = useState([])
    // se utiliza el useEffect para hacer la peticion a las tareas 
    useEffect(()=>{
        // la llamada a la funcion getAllTask se tiene que poner dentro de una funcion y ser llamanda dentro del mismo, useEffect ya que es una peticion asincrona
        async function loadTask(){
            const  res = await getAllTasks()
            // sele pasam las tareas  al hook  useState, hay que recorrerlo en un map 
            setTasks(res.data)
        }
        loadTask()
    }, [])
    return(
        <div>
            {tasks.map(task => (
                <div key={task.id} style={{background: "black"}} 
                    onClick={()=>{
                        navigate(`/tasks/${task.id}`)
                    }}
                >
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    )
}