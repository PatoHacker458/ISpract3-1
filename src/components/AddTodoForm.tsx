import React, { useState } from 'react';
import { validateTodoInput } from '../utils/validation';

interface AddTodoFormProps {
  onAddTodo: (title: string, description: string, dueDate: string) => void;
}

const getMinDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const minDate = getMinDate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ titleError?: string, descriptionError?: string } | null>(null);
  const [dueDate, setDueDate] = useState(minDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTodoInput(title, description);

    if (validationErrors) {
      // Si hay errores, los guardamos en el estado y detenemos la ejecución
      setErrors(validationErrors);
      return; 
    }
    
    if (new Date(dueDate) < new Date(minDate)) {// QUI VALIDACION QUIJANO
        alert('La fecha de vencimiento debe ser igual o posterior a la fecha actual.');
        setDueDate(minDate); 
        return;
    }

    setErrors(null);
    onAddTodo(title, description, dueDate); 
    setTitle('');
    setDescription('');
    setDueDate(minDate);
  };
 
  return (
    <form onSubmit={handleSubmit} className="task-form-container p-3 p-md-4 rounded shadow-sm">
      <div className="row g-3"> 
        
        <div className="col-lg-3 col-md-5 col-sm-6 d-flex flex-column task-input-group">
          <label className="mb-1 text-light">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Learn JS"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
          {errors?.titleError && <small className="text-danger mt-1">{errors.titleError}</small>}
        </div>

        <div className="col-12 col-lg-7 col-md-7 d-flex flex-column task-input-group">
          <label className="mb-1 text-light">Description</label>
          <input
            type="text"
            id="description"
            className="form-control" 
            placeholder="Watch JS Tutorials"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          />
          {errors?.descriptionError && <small className="text-danger mt-1">{errors.descriptionError}</small>}
        </div>

        <div className="col-lg-3 col-md-5 col-sm-6 d-flex flex-column task-input-group">
          <label htmlFor="dueDate" className="mb-1 text-light">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="form-control" 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={minDate}
          />
        </div>

        <div className="col-lg-2 col-md-3 col-sm-4 d-flex align-items-end">
          <button type="submit" className="btn btn-primary task-btn-add w-100" id="add">
            Add
          </button>
        </div>

      </div>
    </form>
  );
};

export default AddTodoForm;