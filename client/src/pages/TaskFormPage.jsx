import { useEffect } from 'react';
// useForm sirve para validar formularios
import { useForm } from "react-hook-form";
// importando el envio de datos para crear tarea
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api'
// se importa useNavigate para redireccionar a otro lugar, useParams sierve para extraer los parametros de la url
import { useNavigate, useParams} from 'react-router-dom'
// paquete de react-hot-toast para mostrar alertas, poner en minusculas
import {toast} from 'react-hot-toast'
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
        toast.success('Tarea actualizada correctamente', {
            position: "bottom-right",
            style: {
                background: "#fff",
                color: "#000"
            }
        })
    }else{
        // envio de datos a crear y tiene que ser asincrona
        await createTask(data)
        // mostrando alertas correctas al crear tarea
        toast.success('Tarea creada correctamente', {
            position: "bottom-right",
            style: {
                background: "#fff",
                color: "#000"
            }
        })
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
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                {/* se le pasan como atributo */}
                {/* register se le agregan los valores como un objeto pero orita se le esta pidiendo todo, se le pasan como parametros, 1ro el name y el id, 2do como objeto requerido */}
                <input type="text" placeholder="Titulo"  {...register("title", { required: true })}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/>
                {/* mostrando mensajes de errores si se cumple el error mostrara eso*/}
                {errors.title && <span>Este campo es requerido</span>}
                <textarea  cols="30" rows="3" placeholder="Descripcion" {...register("description", { required: true })}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></textarea>
                {errors.description && <span>Este campo es requerido</span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Guardar</button>
                {/* condicional si se esta reciviebndo un parametro por id muestra el boton eliminar  */}
                {/* para eliminar hay que hacer una consulta a el backend en , task.api.js*/}
                {params.id &&  <button onClick={async ()=>{
                    const accepted = window.confirm('Eliminar tarea?')
                    // si se accepta la alerta
                    if (accepted){ 
                        // eliminando tarea cpor medio del id tiene que ser await la eliminacion es decir asincrona
                        await deleteTask(params.id)
                        // mostrando alertas correctas al crear tarea
                        toast.success('Tarea eliminada correctamente', {
                            position: "bottom-right",
                            style: {
                                background: "#fff",
                                color: "#000"
                            }
                        })
                        navigate("/");
                    }
                }}
                className='bg-red-500 p-3 rounded-lg block w-full mt-3'
                >Eliminar</button>}
            </form>
        </div>
    )
}