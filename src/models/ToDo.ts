export interface Todo {
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export interface TodoListResponse {
  record: Todo[];
  metadata: {
    // Detalles de la API
  };
}