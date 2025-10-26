import type { Todo } from '../models/ToDo'; 

// Definición del tipo de estado de filtro para mantener el archivo autocontenido
type FilterStatus = 'all' | 'pending' | 'completed';

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

/**
 * Filtra una lista de tareas (Todo[]) basándose en su estado de completitud.
 * @param todos La lista completa de tareas.
 * @param status El estado por el cual filtrar: 'all', 'pending', o 'completed'.
 * @returns La lista de tareas filtrada según el estado.
 */
export const filterTodosByStatus = (todos: Todo[], status: FilterStatus): Todo[] => {
    // Implementación para pasar el test a VERDE
    switch (status) {
        case 'completed':
            return todos.filter(todo => todo.completed === true);
        case 'pending':
            return todos.filter(todo => todo.completed === false);
        case 'all':
        default:
            return todos;
    }
};
