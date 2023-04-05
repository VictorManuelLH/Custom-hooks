import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"

export const useTodos = () => {
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    // const initialState = []
    
    const [ todos, dispatch ] = useReducer( todoReducer, [], init )
    
    useEffect(() => {
        localStorage.setItem( 'todos', JSON.stringify( todos ) )
    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add todo',
            payload: todo
        }
        dispatch( action );
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove todo',
            payload: id
        })
    }
    
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle todo',
            payload: id
        })
    }
    
    return {
        todos,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length
    }
}