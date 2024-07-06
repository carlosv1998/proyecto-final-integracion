import  { InputType, InputId } from "./types.d";

export const variables = {
  JWT_SECRET: 'llave-secreta-para-el-jwt'
}

export const formData = [
  {
    id: InputId.nombre,
    text: "Nombre",
    type: InputType.text,
    errorMessage: {
      required: 'El nombre es requerido',
      minLength: 'El nombre debe tener al menos 4 caracteres',
      invalid: 'El nombre debe contener solo letras'
    }
  },
  {
    id: InputId.apellidoP,
    text: "Apellido paterno",
    type: InputType.text,
    errorMessage: {
      required: 'El apellido es requerido',
      minLength: 'El apellido debe tener al menos 4 caracteres',
      invalid: 'El apellido debe contener solo letras'
    }
  },
  {
    id: InputId.apellidoM,
    text: "Apellido materno",
    type: InputType.text,
    errorMessage: {
      required: 'El apellido es requerido',
      minLength: 'El apellido debe tener al menos 4 caracteres',
      invalid: 'El apellido debe contener solo letras'
    }
  },
  {
    id: InputId.fechaNacimiento,
    text: "Fecha de nacimiento",
    type: InputType.date,
    errorMessage: {
      required: 'La fecha de nacimiento es requerida'
    }
  },
  {
    id: InputId.correo,
    text: "Correo",
    type: InputType.email,
    errorMessage: {
      required: 'El correo es requerido',
      minLength: 'El correo debe tener al menos 4 caracteres',
      invalid: 'El correo no es valido',
      existe: 'El correo ya existe'
    }
  },
  {
    id: InputId.contra,
    text: "Contraseña",
    type: InputType.password,
    errorMessage: {
      required: 'La contraseña es requerida',
      minLength: 'La contraseña debe tener al menos 6 carácteres',
      invalid: 'La contraseña es inválida'
    }
  },
  {
    id: InputId.confirmarContra,
    text: "Confimar contraseña",
    type: InputType.password,
    errorMessage: {
      required: 'La confirmación de la contraseña es requerida',
      minLength: 'La confirmación de la contraseña debe tener al menos 6 carácteres',
      invalid: 'Las contraseñas no coinciden'
    }
  },
  {
    id: InputId.rut,
    text: "RUT",
    type: InputType.text,
    errorMessage: {
      required: 'El rut es requerido',
      minLength: 'El rut debe tener al menos 8 caracteres',
      invalid: 'El rut es inválido'
    }
  },
  {
    id: InputId.telefono,
    text: "Télefono",
    type: InputType.text,
    errorMessage: {
      required: 'El teléfono es requerido',
      minLength: 'El teléfono debe tener al menos 9 caracteres',
      invalid: 'El teléfono es inválido'
    }
  }
]