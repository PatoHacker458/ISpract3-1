// src/utils/todoFilters.ts

import type { Todo } from '../models/ToDo'; 

/**
 * Filtra una lista de tareas (Todo[]) basándose en un término de búsqueda en el título.
 * @param todos La lista completa de tareas.
 * @param searchTerm El texto ingresado por el usuario.
 * @returns La lista de tareas filtrada.
 */
export const filterTodosByTitle = (todos: Todo[], searchTerm: string): Todo[] => {
    // Si el término de búsqueda está vacío o solo tiene espacios, devuelve la lista completa.
    const trimmedTerm = searchTerm.trim().toLowerCase();
    
    if (!trimmedTerm) {
        return todos;
    }

    return todos.filter(todo => 
        // Compara el título de la tarea (en minúsculas) con el término (en minúsculas)
        todo.title.toLowerCase().includes(trimmedTerm)
    );
};