import React, {useEffect, useState} from 'react';

const TasksoufUser =()=>{

const [ list, setList ] = useState( [] );
const [ userId, setUserId ] = useState( 1 );
const [ userData, setUserData ] = useState( null );

useEffect( () => {
    const getUser = async() => {
        const data = await fetch( `https://jsonplaceholder.typicode.com/users/${ userId }` );
        const jsonUser = await data.json();
        console.log( 'user', jsonUser );

        setUserData( jsonUser );
    };
    getUser();
    const getList = async() => {
        const data = await fetch( `https://jsonplaceholder.typicode.com/users/${ userId }/todos` );
        const jsonList = await data.json();
        console.log( 'list', jsonList );

        setList( jsonList );
    };

    getList();
}, [ userId ] );
const handleAddTask = () => {
    const title = document.querySelector( '#task' ).value;
    setList( prevState => [
        ...prevState, {
            title,
            completed: false
        }
    ] );
    document.querySelector( '#task' ).value = '';
};

const handleDeleteTask = ( index ) => {
    setList( ( prevState ) => {
        return prevState.filter( ( task, i ) => i !== index );
    } );
};

const handleCompleteTask = ( index ) => {
    setList( ( prevState ) => {
        const listUpdated = [ ...prevState ];
        listUpdated[ index ].completed = true;
        return listUpdated;
    } );
};
const handlePreviousUser = () => {
    setUserId( userId - 1 );
};

const handleNextUser = () => {
    setUserId( userId + 1 );
};
return (
    <>
        {
            userId > 1 &&
            <button onClick={ handlePreviousUser }>Anterior usuario</button>
        }
        {
            userId < 10 &&
            <button onClick={ handleNextUser }>Siguiente usuario</button>
        }
        {
            userData
                ?
                <>
                    <h1>Información del usuario</h1>
                    <ul>
                        <li><strong>Nombre: </strong> { userData.name }</li>
                        <li><strong>Usuario: </strong> { userData.username }</li>
                        <li><strong>Email: </strong> { userData.email }</li>
                        <li><strong>Web: </strong> { userData.website }</li>
                        <li><strong>Teléfono: </strong> { userData.phone }</li>
                    </ul>
                </>
                : '.....'
        }

        <div>
            <label htmlFor='task'>Tarea</label>
            <input type='text' id='task' />

            <button onClick={ handleAddTask }>Agregar tarea</button>
        </div>

        <h1>Lista de tareas ({ list.length } en total)</h1>
        <table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Eliminar</th>
            </tr>
            </thead>
            <tbody>
            {
                list.map( ( task, index ) => (
                        <tr key={ index }>
                            <td>{ task.title }</td>
                            <td className={ task.completed
                                ? 'task-completed'
                                : 'task-pending' }>
                                {
                                    task.completed
                                        ? 'Completada'
                                        : <button onClick={ () => handleCompleteTask( index ) }>Marcar como completada</button>
                                }
                            </td>
                            <td>
                                <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    </>
);
}
export default TasksoufUser;