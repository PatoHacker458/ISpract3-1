import React, { useState, useEffect } from 'react';
import Popup from './components/Popup'; 

interface Todo {
  // id: string; //para JSON Bin
  title: string;
  description: string;
  completed: boolean;
}

// Popup
interface PopupInfo {
  title: string;
  message: string;
}

function App() {
  
  const [todos, setTodos] = useState<Todo[]>([]); // Array de tareas
  const [title, setTitle] = useState(''); // Input title
  const [description, setDescription] = useState(''); // Input descripcion
  const [popup, setPopup] = useState<PopupInfo | null>(null); // Mostrar popoup

  // Fetch inicial al JSON Bin
  useEffect(() => {
    // const fetchTodos = async () => {
    //   try {
    //     // const response = await fetch('URL_DE_JSON_BIN', { ... });
    //     // const data = await response.json();
    //     // setTodos(data.record o data);
    //   } catch (error) {
    //     console.error("Error al cargar tareas:", error);
    //     setPopup({ title: "Error", message: "No se pudieron cargar las tareas." });
    //   }
    // };
    // fetchTodos();

    // Datos de ejemplo mientras no hay JSON Bin
    setTodos([
      { title: "Learn JS", description: "Watch Javascript tutorials on Youtube", completed: false }
    ]);
  }, []);

  
  // Añadir tareas
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (title === "" || description === "") {
      setPopup({ title: "Warning", message: "Title and desc required" });
      return;
    }

    const newTodo: Todo = {
      title,
      description,
      completed: false
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);

    // Preparacion de JSON Bin PUT POST etc
    // updateJsonBin(newTodos);

    setTitle('');
    setDescription('');
  };

  // Botones editar borrar etc

  const handleDeleteTodo = (indexToDelete: number) => {
    const newTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodos);
    // JSON Bin
    // updateJsonBin(newTodos);
  };

  const toggleComplete = (indexToToggle: number) => {
    const newTodos = todos.map((todo, index) => {
      if (index === indexToToggle) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
    // JSON Bin
    // updateJsonBin(newTodos);
  };


  // JSX
  return (
    <>
      {/*Navbar de index.html*/}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">JS Todo List</a>
        {/*resto de navbar*/}
      </nav>

      <main>
        <div className="container pt-3">
          {/*Popup condicional*/}
          {popup && (
            <Popup 
              title={popup.title} 
              message={popup.message} 
              onClose={() => setPopup(null)} 
            />
          )}

          {/* Formulario de Add To Do */}
          <form onSubmit={handleAddTodo}>
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

          {/* Tabla de Tareas */}
          <div className="mt-5">
            <table className="table table-striped" id="table">
              <thead>
                <tr>
                  <th scope="col">Todo</th>
                  <th scope="col">Description</th>
                  <th scope="col"><div className="d-flex justify-content-center">Completed</div></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí "mapeamos" el estado "todos" a filas de la tabla.
                  React actualizará esto automáticamente.
                */}
                {todos.map((todo, index) => (
                  <tr key={index}>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td className="text-center">
                      <input 
                        type="checkbox" 
                        checked={todo.completed}
                        onChange={() => toggleComplete(index)}
                      />
                    </td>
                    <td className="text-right">
                      <button className="btn btn-primary mb-1">
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button 
                        className="btn btn-danger mb-1 ml-1"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;