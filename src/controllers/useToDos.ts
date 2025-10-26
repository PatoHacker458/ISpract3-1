import { useState, useEffect } from 'react';
import type { Todo } from '../models/ToDo'; 
import { fetchTodos, saveTodos } from '../services/jsonBinService'; 

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- 1. LECTURA ---
    useEffect(() => {
        const loadData = async () => {
        try {
            setError(null);
            setIsLoading(true);
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

    // --- 2. PERSISTENCIA  ---
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


    // --- 3. CREACIÓN ---
    const addTodo = (title: string, description: string): void => {
        const newTodo: Todo = {
            title, 
            description,
            completed: false,
        };
        setTodos((prev) => [...prev, newTodo]);
        setError(null);
    };

    // --- 4. ACTUALIZACIÓN  ---
    const updateTodo = (originalTitle: string, newTitle: string, newDescription: string): void => {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.title === originalTitle) {
                    return { 
                        ...todo, 
                        title: newTitle, 
                        description: newDescription 
                    };
                }
                return todo;
            })
        );
    };

    const toggleTodo = (title: string): void => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.title === title ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // --- 5. ELIMINACIÓN  ---
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