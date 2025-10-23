import React from 'react';
import type { Todo } from '../models/ToDo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => (
  <tr key={todo.title}>
    <td>{todo.title}</td>
    <td>{todo.description}</td>
    <td className="text-center">
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={onToggle} // Llama a la función pasada
      />
    </td>
    <td className="text-right">
      <button 
        className="btn btn-primary mb-1"
        onClick={onEdit} // <--- ¡LLAMAR AQUI!
        >
        <i className="fa fa-pencil"></i>
      </button>
      <button 
        className="btn btn-danger mb-1 ml-1"
        onClick={onDelete} // Llama a la función pasada
      >
        <i className="fa fa-trash"></i>
      </button>
    </td>
  </tr>
);

export default TodoItem;