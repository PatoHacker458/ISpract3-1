import React from 'react';
import type { Todo } from '../models/ToDo';
import TodoItem from '../components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete, onEdit }) => (
  <div className="mt-5">
    <table className="table table-striped" id="table">
      <thead>
            <tr>
                <th scope="col">Todo</th>
                <th scope="col">Description</th>
                <th scope="col">Due Date</th>
                <th scope="col"><div className="d-flex justify-content-center">Completed</div></th>
                <th scope="col"></th>
            </tr>
            </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem 
            key={todo.title} 
            todo={todo} 
            onToggle={() => onToggleComplete(todo.title)} 
            onDelete={() => onDelete(todo.title)} 
            onEdit={() => onEdit(todo)}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default TodoList;