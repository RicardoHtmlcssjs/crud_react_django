//aqui es donde se haran las peticiones a el backend con axio que es un paquete, para hacer peticiones o coneciones con api
import axios from 'axios'

// para que no de error hay que permitir en el backend, la coneccion entre servidores, eb la variable CORS_ALLOWED_ORIGINS=[""], en el archivo settings.py de el proyecto de python

export const getAllTasks = () =>{
    // peticion para obtener valor con get de las tasks
    // en el backend tienen que configurar los permisos, para la conexion entre servidores,
    return axios.get('http://localhost:8000/tasks/api/v1/tasks/')
}

// crear tarea pero esta recive la task que seria un objeto, tiene que ser importada para poder usarla
export const createTask = (task) =>{
    return axios.post('http://localhost:8000/tasks/api/v1/tasks/', task)
}

// eliminar tarea, tiene que ser importa esta constante donde se valla a utilizar
export const deleteTask = (id) =>{
    return axios.delete(`http://localhost:8000/tasks/api/v1/tasks/${id}`)
}

// actualizar tarea, put es para actualizar, el put tiene que terminar /
export const updateTask = (id, task) =>{
    return axios.put(`http://localhost:8000/tasks/api/v1/tasks/${id}/`, task)
}
// obtener valores de una tarea en espesifica
export const getTask = (id)=>{
    return axios.get(`http://localhost:8000/tasks/api/v1/tasks/${id}`)
}