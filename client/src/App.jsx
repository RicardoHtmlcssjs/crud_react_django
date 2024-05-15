// paquete para espesificar rutas
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// imporatndo las pages TasksPage para mostar en una ruta
import TaskPage from './pages/TaskPage.jsx' 
import TaskFormPage from './pages/TaskFormPage.jsx'
// importando navegacion
import Navigation from './components/Navigation.jsx'

 export default function App(){
  return (
    // etiqueta donde estaran enceradas todas las rutas de react-router-dom
    <BrowserRouter>
    <Navigation></Navigation>
    {/* necesaria para las rutas */}
      <Routes>
        {/* ruta en espesifica, en este caso lleva 2 parametros, 1ro: ruta, 2do element, es decir que ejecutara en este caso un componente, <Navigate /> lo que hace redireccionar.*/}
        <Route path='/' element={ <Navigate to='/tasks'></Navigate> }></Route>
        <Route path='/tasks' element={ <TaskPage></TaskPage> }></Route>
        <Route path='/task_create' element={ <TaskFormPage></TaskFormPage> }></Route>
        {/* ruta que recivira un para metro que es el id de la tarea, esta editara una tarea*/}
        <Route path='/tasks/:id' element={ <TaskFormPage></TaskFormPage> }></Route>
      </Routes>
    </BrowserRouter>
  )
}