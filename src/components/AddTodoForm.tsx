import React, { useState } from 'react';
import { validateTodoInput } from '../utils/validation';

interface AddTodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ titleError?: string, descriptionError?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTodoInput(title, description);

    if (validationErrors) {
      // Si hay errores, los guardamos en el estado y detenemos la ejecución
      setErrors(validationErrors);
      return; 
    }

    setErrors(null);
    onAddTodo(title, description); 
    setTitle('');
    setDescription('');
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