import { useState, useEffect, useRef, useMemo } from 'react';
import type { Todo } from '../models/ToDo'; 
import { fetchTodos, saveTodos } from '../services/jsonBinService'; 

type FilterStatus = 'all' | 'pending' | 'completed';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const previousTodosRef = useRef<Todo[]>([]);
    const [isRollingBack, setIsRollingBack] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    // --- 1. LECTURA ---
    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                setIsLoading(true);
                const initialTodos = await fetchTodos();
                setTodos(initialTodos);
                previousTodosRef.current = initialTodos;
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
        if (isRollingBack) {
            setIsRollingBack(false); 
            return; 
        }

        if (!isLoading) {
            const todosToSave = todos;
            const previousTodos = previousTodosRef.current;

            const delaySave = setTimeout(async () => {
                try {
                    setError(null); 
                    await saveTodos(todos); 
                    previousTodosRef.current = todosToSave;
                } catch (e) {
                    const errorMessage = e instanceof Error ? e.message : "Error desconocido de persistencia.";
                    setIsRollingBack(true);
                    setTodos(previousTodos);
                    setError(errorMessage); 
                }
            }, 500); 

        return () => clearTimeout(delaySave);
        }
    }, [todos, isLoading]);

    // LÓGICA DE FILTRADO COMBINADO
    const filteredTodos = useMemo(() => {
        
        let result = todos;

        //Filtro por status
        if (filterStatus !== 'all') {
            const isCompleted = filterStatus === 'completed';
            result = result.filter(todo => todo.completed === isCompleted);
        }
        
        //Filtro por titulo
        const trimmedTerm = searchTerm.trim().toLowerCase();
        
        //Aplicamos el filtro de búsqueda si hay un término válido
        if (trimmedTerm) { 
            result = result.filter(todo => 
                todo.title.toLowerCase().includes(trimmedTerm)
            );
        }

        return result;
        
    }, [todos, searchTerm, filterStatus]);


    // --- 3. CREACIÓN ---
    const addTodo = (title: string, description: string, dueDate: string): void => {
        const newTodo: Todo = {
        title, 
        description,
        completed: false,
        dueDate,
        };
        setTodos((prev) => [...prev, newTodo]);
        setError(null);
    };

    // --- 4. ACTUALIZACIÓN  ---
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
        error,
        searchTerm,        
        setSearchTerm,     
        filteredTodos,
        filterStatus,
        setFilterStatus
    };
};