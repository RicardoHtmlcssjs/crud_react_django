// componente link redifrecciona al hacer click en un hipervinculo, sustituye a la etiqueta a  
import { Link } from "react-router-dom"

export default function Navigation(){
    return(
        <div>
           <Link to='/'><h1>App Tasks</h1></Link>
            <Link to="/task_create">Crear tarea</Link>
        </div>
    )
}