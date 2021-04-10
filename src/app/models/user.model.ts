/**
 * Definición del modelo usado para todos los usuarios de Ops Blancos
 * @export
 * @interface iUser
 */
export interface iUser {
  /** REQUERIDO. Dato de email que debe ser validado con el formato correcto de dirección de correo. A veces el correo es utilizado como ID de usuario provisional o como elemento de referencia para buscar en la base de datos*/
  email: string,
  /** REQUERIDO Nombre completo del usuario*/
  full_name: string
  /** REQUERIDO Número de celular vinculado con la cuenta*/
  celular: string
  /** REQUERIDO Define los permisos y vistas para el usuario */
  rol: tRol
  /** OPCIONAL. Dato identificador interno de la base de datos */
  uid: string
}

/** Tipo de roles de usuario existentes en la aplicación */
export type tRol = 'limpieza' | 'lavanderia' | 'city-manager' | 'admin';


/**
 * Formato interno para mostrar y manejar los roles de usuario en la aplicación
 * @export
 * @interface iRolSelect
 */
export interface iRolSelect {
  /** Valor interno que sólo puede ser de tipo `tRol` */
  value: tRol
  /** El texto a mostrar equivalente al `value` */
  display: string
}

