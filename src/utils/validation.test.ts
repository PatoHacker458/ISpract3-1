import { describe, it, expect } from 'vitest';
import { validateTodoInput } from './validation';

describe('validateTodoInput', () => {

  const TITLE_LIMIT_MSG = 'El título no puede exceder los 50 caracteres.';
  const DESC_LIMIT_MSG = 'La descripción no puede exceder los 200 caracteres.';
  const EMPTY_TITLE_MSG = 'El título no puede estar vacío.';

  it('debería retornar null si la entrada es válida', () => {
    expect(validateTodoInput('Tarea válida', 'Descripción correcta')).toBeNull();
  });

  it('debería retornar error si el título está vacío', () => {
    const result = validateTodoInput('', 'Descripción');
    expect(result).toEqual({ titleError: EMPTY_TITLE_MSG });
  });

  it('debería retornar error si el título excede los 50 caracteres', () => {
    const longTitle = 'a'.repeat(51);
    const result = validateTodoInput(longTitle, 'Descripción');
    expect(result).toEqual({ titleError: TITLE_LIMIT_MSG });
  });

  it('debería retornar error si la descripción excede los 200 caracteres', () => {
    const longDescription = 'b'.repeat(201);
    const result = validateTodoInput('Título', longDescription);
    expect(result).toEqual({ descriptionError: DESC_LIMIT_MSG });
  });
  
  it('debería retornar ambos errores si ambos campos son inválidos', () => {
    const longTitle = 'a'.repeat(51);
    const longDescription = 'b'.repeat(201);
    const result = validateTodoInput(longTitle, longDescription);
    expect(result).toEqual({ 
      titleError: TITLE_LIMIT_MSG, 
      descriptionError: DESC_LIMIT_MSG 
    });
  });

  it('debería manejar el error de título vacío y de límite de descripción simultáneamente', () => {
    const longDescription = 'b'.repeat(201);
    const result = validateTodoInput('', longDescription);
    expect(result).toEqual({ 
      titleError: EMPTY_TITLE_MSG, 
      descriptionError: DESC_LIMIT_MSG 
    });
  });
});