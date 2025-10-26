import React from 'react';
import type { Todo } from '../models/ToDo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const getTodayString = (): string => {
    return new Date().toISOString().split('T')[0];
};

//Determina si la la tarea eta pasadq de fecha pero no completadas
const isOverdue = (todo: Todo): boolean => {
    if (todo.completed) {
        return false;
    }
    const todayStr = getTodayString();
    return todo.dueDate < todayStr;
};

//Determina si la tarea vence HOY
const isDueToday = (todo: Todo): boolean => {
    if (todo.completed) {
        return false;
    }
    return todo.dueDate === getTodayString();
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  //Determina si la tarea está completada o vencida.
  let rowClass = '';
  if (todo.completed) {
    rowClass = 'table-success';
  } else if (isOverdue(todo)) {
    rowClass = 'table-danger';
  }
  else if (isDueToday(todo)){
    rowClass = 'table-warning';
  }

  return (
    <tr className={rowClass}>
      <td>{todo.title}</td>
      <td>{todo.description}</td>

      <td>{todo.dueDate}</td>

      <td className="text-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
      </td>
      <td className="text-right">
        <button
          className="btn btn-primary mb-1"
          onClick={onEdit}
        >
          <i className="fa fa-pencil"></i>
        </button>
        <button
          className="btn btn-danger mb-1 ml-1"
          onClick={onDelete}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;