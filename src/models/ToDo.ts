export interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoListResponse {
  record: Todo[];
  metadata: {
    //poner detalleess apii
  };
}