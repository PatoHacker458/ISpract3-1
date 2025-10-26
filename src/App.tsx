import { useState, useEffect } from 'react';
import { useTodos } from './controllers/useToDos';
import Popup from './components/Popup';
import type { PopupInfo } from './models/PopupInfo';
import type { Todo } from './models/ToDo';
import Navbar from './components/Navbar';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import EditTodoModal from './components/EditTodoModal'; 
import SearchBar from './components/SearchBar';
import StatusButton from './components/StatusButton';

function App() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, isLoading, error, searchTerm, setSearchTerm, filteredTodos,filterStatus, setFilterStatus } = useTodos();
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

  const handleAdd = (title: string, description: string, dueDate: string) => {
      addTodo(title, description, dueDate); 
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

            <hr className="my-4" />
          
            {/* Criterio 1: Campo de búsqueda visible */}
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} // Conecta el input al setSearchTerm del hook
            />

            <div className="flex flex-wrap gap-3 mb-4 justify-start">
            <StatusButton 
              status="all" 
              label="Todas"
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            <StatusButton 
              status="pending" 
              label="Pendientes"
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            <StatusButton 
              status="completed" 
              label="Completadas"
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </div>

            {/* Criterio 4: Mensaje de no coincidencias */}
            {filteredTodos.length === 0 && searchTerm.trim() !== '' && (
                <div className="alert alert-info mt-3" role="alert">
                    No se encontraron tareas con el título "{searchTerm}".
                </div>
            )}

            {editingTodo && (
              <EditTodoModal
                todo={editingTodo}
                onClose={() => setEditingTodo(null)} 
                onSave={updateTodo} 
              />
            )}

            {(filteredTodos.length > 0 || searchTerm.trim() === '') && (
                <TodoList 
                    todos={filteredTodos} 
                    onToggleComplete={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={setEditingTodo}
                />
            )}
            
          </div>
        </main>
      </>
    );
  }

export default App;