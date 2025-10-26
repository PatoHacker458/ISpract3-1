import type { Todo, TodoListResponse } from '../models/ToDo';

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const SECRET_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

if (!SECRET_KEY || !BIN_ID) {
    throw new Error("Missing JSONBin API keys or BIN ID. Check your .env file and ensure keys start with VITE_");
}

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch(BASE_URL, {
        headers: {
            'X-Master-Key': SECRET_KEY,
        },
    });
    
    if (!response.ok) {
        throw new Error('Error al cargar las tareas');
    }

    const data: TodoListResponse = await response.json();
    return data.record; 
};

export const saveTodos = async (todos: Todo[]): Promise<void> => {
    const response = await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': SECRET_KEY,
        },
        body: JSON.stringify(todos),
    });

    if (!response.ok) {
        throw new Error('Error al subir las tareas');
    }
};