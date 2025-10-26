import React, { useState } from 'react';
import type { Todo } from '../models/ToDo';

const getMinDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface EditTodoModalProps {
    todo: Todo; 
    onClose: () => void; 
    onSave: (originalTitle: string, newTitle: string, newDescription: string, newDueDate: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onClose, onSave }) => {
    const minDate = getMinDate();
    // Estado local para los campos del formulario
    const [newTitle, setNewTitle] = useState(todo.title); 
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.dueDate);

    const originalTitle = todo.title; 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTitle.trim() === '' || description.trim() === '' || dueDate.trim() === '') return;

        if (new Date(dueDate) < new Date(minDate)) { //AQUI VALIDACION QUIJANO
            alert('La fecha de vencimiento debe ser igual o posterior a la fecha actual.');
            return;
        }

        onSave(originalTitle, newTitle, description, dueDate);
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

          <label>Fecha de Vencimiento</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={minDate}
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