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
    <form onSubmit={handleSubmit}>
      <div className="row">
              <div className="col-sm-3 d-sm-flex align-items-center">
                <label className="m-sm-0">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control ml-sm-2"
                  placeholder="Learn JS"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
                {errors?.titleError && <small className="text-danger ml-sm-2">{errors.titleError}</small>}
              </div>

              <div className="px-sm-2 col-sm-7 d-sm-flex align-items-center mt-2 mt-sm-0">
                <label className="m-sm-0">Description</label>
                <input
                  type="text"
                  id="description"
                  className="form-control ml-sm-2"
                  placeholder="Watch JS Tutorials"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                />
                {errors?.descriptionError && <small className="text-danger ml-sm-2">{errors.descriptionError}</small>}
              </div>

              <div className="col-sm-3 d-sm-flex align-items-center mt-2 mt-sm-0">
                <label htmlFor="dueDate" className="m-sm-0">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  className="form-control ml-sm-2"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={minDate} // Impide seleccionar visualmente fechas pasadas
                />
              </div>

              <div className="col-sm-2 d-sm-flex justify-content-end mt-4 mt-sm-0">
                <button type="submit" className="btn btn-info btn-block" id="add">
                  Add
                </button>
              </div>
            </div>
    </form>
  );
};

export default AddTodoForm;