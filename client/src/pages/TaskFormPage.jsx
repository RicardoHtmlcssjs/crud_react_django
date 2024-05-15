import { useEffect } from 'react';
// useForm sirve para validar formularios
import { useForm } from "react-hook-form";
// importando el envio de datos para crear tarea
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api'
// se importa useNavigate para redireccionar a otro lugar, useParams sierve para extraer los parametros de la url
import { useNavigate, useParams} from 'react-router-dom'
// aqui habra un formulario donde se estaran agtegano las tareas
export default function TaskFormPage(){
    // {register} esto valida un formualrio y  le da un id y un name. handleSubmit controla el enviode formularios, formState: { errors } lo que hace es mostrar un mensaje de error
    // setValue es para asignar un valor un campo o input
const {register, handleSubmit, formState: { errors }, setValue} = useForm()
// constante para redireccionar
const navigate = useNavigate()
// constatnte que almacena en un ovjeto, los valores obtenidos por la url
const params = useParams()

// creacion de constante ejecutar el handleSubmit al enviar el formulario
const onSubmit = handleSubmit(async data => {
    if (params.id){
        await updateTask(params.id, data)
    }else{
        // envio de datos a crear y tiene que ser asincrona
        await createTask(data)
    }
    
    // redireccionando
    navigate("/tasks");
})
// hook useEffect se ejecutar al ejecutarce este archivo del formulario, si se esta reciviendo un paa metro mostrar los valores en de cada campo de la tarea a actualizar
useEffect(()=>{
    // si se esta enviado algo por la url,  ene ste caso en al eitar una tarea que muestre los valores en cada input 
    async function loadTask(){
        if(params.id){
            const res = await getTask(params.id)
            // asignado valor a los input
            setValue('title', res.data.title)
            setValue('description', res.data.description)
        }else{
            setValue('title', '')
            setValue('description', '')
        } 
    }
   loadTask()
},[])

// el envio de valores a el backend se hacen de task.api.js
    return (
        <div>
            <form onSubmit={onSubmit}>
                {/* se le pasan como atributo */}
                {/* register se le agregan los valores como un objeto pero orita se le esta pidiendo todo, se le pasan como parametros, 1ro el name y el id, 2do como objeto requerido */}
                <input type="text" placeholder="Titulo"  {...register("title", { required: true })}/>
                {/* mostrando mensajes de errores si se cumple el error mostrara eso*/}
                {errors.title && <span>Este campo es requerido</span>}
                <textarea  cols="30" rows="3" placeholder="Descripcion" {...register("description", { required: true })}></textarea>
                {errors.description && <span>Este campo es requerido</span>}
                <button>Guardar</button>
                {/* condicional si se esta reciviebndo un parametro por id muestra el boton eliminar  */}
                {/* para eliminar hay que hacer una consulta a el backend en , task.api.js*/}
                {params.id &&  <button onClick={async ()=>{
                    const accepted = window.confirm('Eliminar tarea?')
                    // si se accepta la alerta
                    if (accepted){ 
                        // eliminando tarea cpor medio del id tiene que ser await la eliminacion es decir asincrona
                        await deleteTask(params.id)
                        navigate("/");
                    }
                }}>Eliminar</button>}
            </form>
        </div>
    )
}