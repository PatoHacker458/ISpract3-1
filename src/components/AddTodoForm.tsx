import React, { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;
    
    // Llama a la función que viene del padre (App.tsx)
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
                />
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