// En: src/utils/validation.ts

// Definimos los límites
const TITLE_MAX_LENGTH = 50;
const DESC_MAX_LENGTH = 200;

// Definimos los mensajes de error
const ERROR_MESSAGES = {
  TITLE_LIMIT: `El título no puede exceder los ${TITLE_MAX_LENGTH} caracteres.`,
  DESC_LIMIT: `La descripción no puede exceder los ${DESC_MAX_LENGTH} caracteres.`,
  EMPTY_TITLE: 'El título no puede estar vacío.',
  EMPTY_DESC: 'La descripción no puede estar vacía.'
};

// Interface para el objeto de errores
interface ValidationErrors {
  titleError?: string;
  descriptionError?: string;
}

/**
 * Valida el título y la descripción de una tarea.
 * Retorna un objeto de errores si hay problemas, o null si es válido.
 */
export const validateTodoInput = (title: string, description: string): ValidationErrors | null => {
  
  const errors: ValidationErrors = {};

  // Primero validamos el título vacío
  if (title.trim() === '') {
    errors.titleError = ERROR_MESSAGES.EMPTY_TITLE;
  } 

  if (description.trim() === '') {
    errors.descriptionError = ERROR_MESSAGES.EMPTY_DESC;
  } 

  // Luego validamos la longitud del título
  else if (title.length > TITLE_MAX_LENGTH) {
    errors.titleError = ERROR_MESSAGES.TITLE_LIMIT;
  }

  // Validamos la longitud de la descripción
  if (description.length > DESC_MAX_LENGTH) {
    errors.descriptionError = ERROR_MESSAGES.DESC_LIMIT;
  }

  // Si el objeto 'errors' tiene alguna clave, retornamos el objeto. Si no, retornamos null.
  return Object.keys(errors).length > 0 ? errors : null;
  
};