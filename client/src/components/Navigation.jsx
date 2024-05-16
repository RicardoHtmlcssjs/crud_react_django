// componente link redifrecciona al hacer click en un hipervinculo, sustituye a la etiqueta a  
import { Link } from "react-router-dom"

export default function Navigation(){
    return(
        <div className="flex justify-between py-3">
           <Link to='/'><h1 className="font-bold text-3xl mb-4">App Tasks</h1></Link>
           
            <Link to="/task_create">
                <button className="bg-indigo-500 px-3 py-2 rounded-lg hover:bg-indigo-400">Crear tarea</button>
            </Link>           
        </div>
    )
}