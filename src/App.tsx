import React, { useState, useEffect } from 'react';
import { useTodos } from './controllers/useToDos';
import Popup from './components/Popup';
import type { PopupInfo } from './models/PopupInfo';
import type { Todo } from './models/ToDo';
import Navbar from './components/Navbar';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import EditTodoModal from './components/EditTodoModal'; 

function App() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, isLoading, error } = useTodos();
  const [popup, setPopup] = useState<PopupInfo | null>(null); 
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (error) {
      setPopup({
        title: "¡Error!",
        message: error,
      });
    }
  }, [error]);

  const handleAdd = (title: string, description: string) => {
      addTodo(title, description); 
  };

  if (isLoading) {
    return <div>Cargando tareas...</div>;
  }


  // JSX
  return (
      <>
        <Navbar title="TS Todo List" />
        <main>
          <div className="container pt-3">
            {/* 1. Popup */}
            {popup && (
              <Popup 
                title={popup.title} 
                message={popup.message} 
                onClose={() => setPopup(null)} 
              />
            )}

            {/* 2. Formulario */}
            <AddTodoForm onAddTodo={handleAdd} />

            {editingTodo && (
              <EditTodoModal
                todo={editingTodo}
                onClose={() => setEditingTodo(null)} 
                onSave={updateTodo} 
              />
            )}

            {/* 3. Lista de Tareas */}
            <TodoList 
              todos={todos} 
              onToggleComplete={toggleTodo}
              onDelete={deleteTodo}
              onEdit={setEditingTodo}
            />
          </div>
        </main>
      </>
    );
  }

export default App;