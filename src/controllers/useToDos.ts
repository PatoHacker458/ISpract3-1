import { useState, useEffect } from 'react';
import type { Todo } from '../models/ToDo'; 
import { fetchTodos, saveTodos } from '../services/jsonBinService'; 

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- 1. LECTURA (R: Read) ---
    // Este useEffect se encarga de la carga inicial (fetchTodos)
    useEffect(() => {
        const loadData = async () => {
        try {
            setError(null);
            setIsLoading(true);
            // Llama al servicio para obtener los datos
            const initialTodos = await fetchTodos();
            setTodos(initialTodos);
        } catch (e) {
            console.error("Error al cargar la lista de tareas:", e);
            setError("No se pudieron cargar las tareas desde el servidor.");
        } finally {
            setIsLoading(false);
        }
        };
        
        loadData();
    }, []);

    // --- 2. PERSISTENCIA (PUT para guardar) ---
    useEffect(() => {
        if (!isLoading) {
        const delaySave = setTimeout(async () => {
            try {
                setError(null); 
                await saveTodos(todos); 
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : "Error desconocido de persistencia.";
                setError(errorMessage); 
            }
        }, 500); 

        return () => clearTimeout(delaySave);
        }
    }, [todos, isLoading]);


    // --- 3. CREACIÓN (C: Create) ---
    const addTodo = (title: string, description: string, dueDate: string): void => {
        const newTodo: Todo = {
        title, 
        description,
        completed: false,
        dueDate,
        };
        // 1. Actualiza el estado de React
        setTodos((prev) => [...prev, newTodo]);
        // 2. El useEffect de persistencia se encarga de llamar a saveTodos.
    };

    // --- 4. ACTUALIZACIÓN (U: Update - Toggle Complete) ---
    const updateTodo = (originalTitle: string, newTitle: string, newDescription: string, newDueDate: string): void => {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.title === originalTitle) {
                    return { 
                        ...todo, 
                        title: newTitle, 
                        description: newDescription,
                        dueDate: newDueDate,
                    };
                }
                return todo;
            })
        );
    };

    const toggleTodo = (title: string): void => {
        // 1. Actualiza el estado de React
        setTodos((prev) =>
        prev.map((todo) =>
            todo.title === title ? { ...todo, completed: !todo.completed } : todo
        )
        );
        // 2. El useEffect de persistencia se encarga de llamar a saveTodos.
    };

    // --- 5. ELIMINACIÓN (D: Delete) ---
    const deleteTodo = (title: string): void => {
        setTodos((prev) => prev.filter((todo) => todo.title !== title));
    };

    return { 
        todos, 
        isLoading,
        addTodo, 
        updateTodo,
        toggleTodo, 
        deleteTodo, 
        error
    };
};