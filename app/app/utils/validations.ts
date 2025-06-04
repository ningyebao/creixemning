// app/utils/validations.ts
import type { Campanya, Client, Producte, Agent } from '~/lib/types';

/**
 * Interfaz para resultados de validación
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Valida si un campo es obligatorio
 * @param value Valor a validar
 * @param fieldName Nombre del campo para el mensaje de error
 * @returns Array de mensajes de error (vacío si es válido)
 */
export const validateRequired = (value: any, fieldName: string): string[] => {
  const errors: string[] = [];
  
  if (value === undefined || value === null || value === '') {
    errors.push(`El campo ${fieldName} es obligatorio`);
  }
  
  return errors;
};

/**
 * Valida un valor numérico
 * @param value Valor a validar
 * @param fieldName Nombre del campo para el mensaje de error
 * @param options Opciones adicionales (mínimo, máximo)
 * @returns Array de mensajes de error (vacío si es válido)
 */
export const validateNumeric = (
  value: any, 
  fieldName: string, 
  options: { min?: number; max?: number } = {}
): string[] => {
  const errors: string[] = [];
  const numValue = Number(value);
  
  if (isNaN(numValue)) {
    errors.push(`El campo ${fieldName} debe ser un número válido`);
    return errors;
  }
  
  if (options.min !== undefined && numValue < options.min) {
    errors.push(`El campo ${fieldName} debe ser mayor o igual a ${options.min}`);
  }
  
  if (options.max !== undefined && numValue > options.max) {
    errors.push(`El campo ${fieldName} debe ser menor o igual a ${options.max}`);
  }
  
  return errors;
};

/**
 * Valida un número de teléfono
 * @param value Valor a validar
 * @param fieldName Nombre del campo para el mensaje de error
 * @returns Array de mensajes de error (vacío si es válido)
 */
export const validatePhone = (value: string, fieldName: string): string[] => {
  const errors: string[] = [];
  
  if (!value) return errors; // Si está vacío, no validamos (usar validateRequired si es obligatorio)
  
  // Eliminar caracteres especiales como espacios, guiones, paréntesis, + para validar
  const cleanedValue = value.replace(/[\s\-\(\)\+]/g, '');
  
  if (!/^\d+$/.test(cleanedValue)) {
    errors.push(`El campo ${fieldName} debe contener solo números`);
  }
  
  if (cleanedValue.length < 9 || cleanedValue.length > 15) {
    errors.push(`El campo ${fieldName} debe tener entre 9 y 15 dígitos`);
  }
  
  return errors;
};

/**
 * Valida un NIF/NIE español
 * @param value Valor a validar
 * @param fieldName Nombre del campo para el mensaje de error
 * @returns Array de mensajes de error (vacío si es válido)
 */
export const validateNIF = (value: string, fieldName: string): string[] => {
  const errors: string[] = [];
  
  if (!value) return errors; // Si está vacío, no validamos (usar validateRequired si es obligatorio)
  
  // Algoritmo simplificado para validar NIF/NIE
  // En producción se recomendaría una validación más robusta
  const nifRegex = /^[0-9XYZ]?\d{7,8}[A-Z]$/i;
  
  if (!nifRegex.test(value)) {
    errors.push(`El campo ${fieldName} no tiene un formato válido de NIF/NIE`);
  }
  
  return errors;
};

/**
 * Valida una fecha
 * @param value Valor a validar (string en formato YYYY-MM-DD)
 * @param fieldName Nombre del campo para el mensaje de error
 * @param options Opciones adicionales (fecha mínima, fecha máxima)
 * @returns Array de mensajes de error (vacío si es válido)
 */
export const validateDate = (
  value: string, 
  fieldName: string, 
  options: { minDate?: Date; maxDate?: Date } = {}
): string[] => {
  const errors: string[] = [];
  
  if (!value) return errors; // Si está vacío, no validamos (usar validateRequired si es obligatorio)
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    errors.push(`El campo ${fieldName} debe tener formato YYYY-MM-DD`);
    return errors;
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    errors.push(`El campo ${fieldName} no es una fecha válida`);
    return errors;
  }
  
  if (options.minDate && date < options.minDate) {
    errors.push(`El campo ${fieldName} debe ser posterior a ${options.minDate.toISOString().split('T')[0]}`);
  }
  
  if (options.maxDate && date > options.maxDate) {
    errors.push(`El campo ${fieldName} debe ser anterior a ${options.maxDate.toISOString().split('T')[0]}`);
  }
  
  return errors;
};

/**
 * Valida que una fecha de fin sea posterior a una fecha de inicio
 * @param startDate Fecha de inicio (string en formato YYYY-MM-DD)
 * @param endDate Fecha de fin (string en formato YYYY-MM-DD)
 * @returns Array de mensajes de error (vacío si es válido)
 */
export const validateDateRange = (startDate: string, endDate: string): string[] => {
  const errors: string[] = [];
  
  if (!startDate || !endDate) return errors;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return errors; // Si alguna de las fechas no es válida, no validamos el rango
  }
  
  if (end < start) {
    errors.push('La fecha de fin debe ser posterior a la fecha de inicio');
  }
  
  return errors;
};

/**
 * Valida un texto con longitud máxima
 * @param value Valor a validar
 * @param fieldName Nombre del campo para el mensaje de error
 * @param maxLength Longitud máxima permitida
 * @returns Array de mensajes de error (vacío si es válido)
 */
export const validateMaxLength = (value: string, fieldName: string, maxLength: number): string[] => {
  const errors: string[] = [];
  
  if (!value) return errors;
  
  if (value.length > maxLength) {
    errors.push(`El campo ${fieldName} no puede superar los ${maxLength} caracteres`);
  }
  
  return errors;
};

// ===============================
// VALIDACIONES POR ENTIDAD
// ===============================

/**
 * Valida los datos de una campaña
 * @param data Datos de la campaña a validar
 * @returns Resultado de la validación
 */
export const validateCampanya = (data: Partial<Campanya>): ValidationResult => {
  const errors: string[] = [];
  
  // Campos obligatorios
  errors.push(...validateRequired(data.id_client, 'ID Cliente'));
  errors.push(...validateRequired(data.campanya_nom, 'Nombre de la Campaña'));
  
  // Validaciones numéricas
  if (data.id_client !== undefined) {
    errors.push(...validateNumeric(data.id_client, 'ID Cliente', { min: 1 }));
  }
  
  if (data.campanya_num_altes_acordades !== undefined) {
    errors.push(...validateNumeric(data.campanya_num_altes_acordades, 'Altas Acordadas', { min: 0 }));
  }
  
  // Validación de fechas
  if (data.data_inici_campanya && data.data_fi_campanya) {
    errors.push(...validateDateRange(data.data_inici_campanya, data.data_fi_campanya));
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida los datos de un cliente
 * @param data Datos del cliente a validar
 * @returns Resultado de la validación
 */
export const validateClient = (data: any): ValidationResult => {
  const errors: string[] = [];
  
  // Campos obligatorios
  errors.push(...validateRequired(data.nom_client, 'Nombre del Cliente'));
  
  // Validar teléfonos
  if (data.telefon1_client?.numero) {
    errors.push(...validatePhone(data.telefon1_client.numero, 'Teléfono Principal'));
  } else {
    errors.push(...validateRequired(data.telefon1_client?.numero, 'Teléfono Principal'));
  }
  
  if (data.telefon2_client?.numero) {
    errors.push(...validatePhone(data.telefon2_client.numero, 'Teléfono Secundario'));
  }
  
  // Validar longitud máxima
  errors.push(...validateMaxLength(data.nom_client || '', 'Nombre del Cliente', 100));
  errors.push(...validateMaxLength(data.observacions_client || '', 'Observaciones', 500));
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida los datos de un producto
 * @param data Datos del producto a validar
 * @returns Resultado de la validación
 */
export const validateProducte = (data: Partial<Producte>): ValidationResult => {
  const errors: string[] = [];
  
  // Campos obligatorios
  errors.push(...validateRequired(data.id_client, 'ID Cliente'));
  errors.push(...validateRequired(data.nom_producte, 'Nombre del Producto'));
  
  // Validaciones numéricas
  if (data.id_client !== undefined) {
    errors.push(...validateNumeric(data.id_client, 'ID Cliente', { min: 1 }));
  }
  
  if (data.preu_producte !== undefined) {
    errors.push(...validateNumeric(data.preu_producte, 'Precio', { min: 0 }));
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida los datos de un agente
 * @param data Datos del agente a validar
 * @returns Resultado de la validación
 */
export const validateAgent = (data: Partial<Agent>): ValidationResult => {
  const errors: string[] = [];
  
  // Campos obligatorios
  errors.push(...validateRequired(data.nom_agent, 'Nombre'));
  errors.push(...validateRequired(data.cognom1_agent, 'Primer Apellido'));
  errors.push(...validateRequired(data.mobil_agent, 'Teléfono Móvil'));
  errors.push(...validateRequired(data.NIF_agent, 'NIF/NIE'));
  
  // Validar teléfonos
  if (data.telefon_agent) {
    errors.push(...validatePhone(data.telefon_agent, 'Teléfono Fijo'));
  }
  
  if (data.mobil_agent) {
    errors.push(...validatePhone(data.mobil_agent, 'Teléfono Móvil'));
  }
  
  // Validar NIF
  if (data.NIF_agent) {
    errors.push(...validateNIF(data.NIF_agent, 'NIF/NIE'));
  }
  
  // Validar fechas
  if (data.data_alta_agent) {
    errors.push(...validateDate(data.data_alta_agent, 'Fecha de Alta'));
  }
  
  if (data.data_baixa_agent) {
    errors.push(...validateDate(data.data_baixa_agent, 'Fecha de Baja'));
    
    // Si hay fecha de alta y fecha de baja, validar el rango
    if (data.data_alta_agent) {
      errors.push(...validateDateRange(data.data_alta_agent, data.data_baixa_agent));
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Procesa errores de validación y devuelve un objeto de mensaje para mostrar al usuario
 * @param validationResult Resultado de la validación
 * @returns Objeto de mensaje formateado { type: 'error', text: 'mensaje de error' }
 */
export const processValidationErrors = (validationResult: ValidationResult): { type: string; text: string } => {
  if (validationResult.isValid) {
    return { type: 'success', text: 'Validación correcta' };
  }
  
  return {
    type: 'error',
    text: 'Error de validación: ' + validationResult.errors.join(', ')
  };
};