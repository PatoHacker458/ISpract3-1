// src/utils/todoFilters.test.ts

import { describe, it, expect } from 'vitest';
import { filterTodosByTitle } from './todoFilters';
import type { Todo } from '../models/ToDo'; 

// Datos de prueba
const mockTodos: Todo[] = [
    { title: 'Aprender React Hooks', description: 'Curso de hooks', completed: false, dueDate: '2025-11-15' },
    { title: 'Comprar Leche', description: 'De la marca Lala', completed: false, dueDate: '2025-10-25' },
    { title: 'Repasar TypeScript', description: 'Interfaces y Types', completed: true, dueDate: '2025-11-01' },
    { title: 'React Native Project', description: 'App móvil', completed: false, dueDate: '2025-12-01' },
];

describe('filterTodosByTitle (Lógica Pura de Filtrado)', () => {

    it('debería retornar una lista filtrada por una palabra clave (ROJO 🔴)', () => {
        const result = filterTodosByTitle(mockTodos, 'React');
        
        // Esperamos dos tareas: 'Aprender React Hooks' y 'React Native Project'
        expect(result).toHaveLength(2);
        expect(result.map(t => t.title)).toEqual(['Aprender React Hooks', 'React Native Project']);
    });

    it('debería ser insensible a mayúsculas y minúsculas', () => {
        const result = filterTodosByTitle(mockTodos, 'typescript');
        
        // Esperamos una tarea
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Repasar TypeScript');
    });

    it('debería retornar la lista completa si el término de búsqueda está vacío (criterio de aceptación)', () => {
        const result = filterTodosByTitle(mockTodos, '');
        
        // Esperamos las 4 tareas
        expect(result).toHaveLength(4);
    });

    it('debería retornar la lista completa si el término de búsqueda es solo espacios', () => {
        const result = filterTodosByTitle(mockTodos, '   ');
        
        // Esperamos las 4 tareas
        expect(result).toHaveLength(4);
    });

    it('debería retornar una lista vacía si no hay coincidencias (criterio de aceptación)', () => {
        const result = filterTodosByTitle(mockTodos, 'XYZ-Inexistente');
        
        // Esperamos 0 tareas
        expect(result).toHaveLength(0);
    });

});