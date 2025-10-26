import React, { useState } from 'react';
import type { Todo } from '../models/ToDo';
import { validateTodoInput } from '../utils/validation';

interface EditTodoModalProps {
    todo: Todo; 
    onClose: () => void; 
    onSave: (originalTitle: string, newTitle: string, newDescription: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onClose, onSave }) => {
    // Estado local para los campos del formulario
    const [newTitle, setNewTitle] = useState(todo.title); 
    const [description, setDescription] = useState(todo.description);
    const [errors, setErrors] = useState<{ titleError?: string, descriptionError?: string } | null>(null);

    const originalTitle = todo.title; 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateTodoInput(newTitle, description);
        if (validationErrors) {
          setErrors(validationErrors);
          return;
        }
        setErrors(null);
        onSave(originalTitle, newTitle, description);
        onClose();
};

  
return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <label>Título</label>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            className="form-control mb-3"
          />

          <label>Descripción</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="form-control mb-3"
          />

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;