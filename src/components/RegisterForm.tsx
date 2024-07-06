"use client"
import { CheckIcon, CloseIcon } from "@/icons/AuthIcons";
import { useEffect, useRef, useState } from "react";
import { formData } from "../../const";
import { InputType, InputId } from "../../types.d";
import { useRouter } from "next/navigation";
import { useUsuario } from "@/hooks/useUsuario";


export const RegisterForm = () => {
  const router = useRouter()
  const [validForm, setValidForm] = useState(false)
  const { dataUsuario } = useUsuario()

  useEffect(() => {
    if (dataUsuario){
      router.push("/logout")
    }
  })


  const [registerData, setRegisterData] = useState({
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    fechaNacimiento: null,
    correo: "",
    rut: "",
    telefono: "",
    contra: "",
    confirmarContra: ""
  })

  const [errors, setErrors] = useState<{
    nombre?: string;
    apellidoP?: string;
    apellidoM?: string;
    fechaNacimiento?: string;
    correo?: string;
    rut?: string;
    telefono?: string;
    contra?: string;
    confirmarContra?: string;
  }>({});

  const [isError, setIsError] = useState({
    nombre: false,
    apellidoP: false,
    apellidoM: false,
    fechaNacimiento: false,
    correo: false,
    rut: false,
    telefono: false,
    contra: false,
    confirmarContra: false
  })

  const errorFlag = useRef({
    nombre: false,
    apellidoP: false,
    apellidoM: false,
    fechaNacimiento: false,
    correo: false,
    rut: false,
    telefono: false,
    contra: false,
    confirmarContra: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({
      ...prev,
      [name]: value
    }))

    setErrors( (prev) => {
      const newErrors = { ...prev };

      if (name === InputId.nombre) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.nombre = formData[0].errorMessage.required;
          setIsError({ ...isError, nombre: true });
        }else if (value.trim().length < 4) {
          newErrors.nombre = formData[0].errorMessage.minLength;
          setIsError({ ...isError, nombre: true });
        }else if (!/^[a-zA-Z]+$/.test(value.trim())){
          newErrors.nombre = formData[0].errorMessage.invalid;
          setIsError({ ...isError, nombre: true });
        }else {
          newErrors.nombre = '';
          setIsError({ ...isError, nombre: false });
        }
      }

      if (name === InputId.apellidoP) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.apellidoP = formData[1].errorMessage.required;
          setIsError({ ...isError, apellidoP: true });
        }else if (value.trim().length < 4) {
          newErrors.apellidoP = formData[1].errorMessage.minLength;
          setIsError({ ...isError, apellidoP: true });
        }else if (!/^[a-zA-Z]+$/.test(value.trim())){
          newErrors.apellidoP = formData[1].errorMessage.invalid;
          setIsError({ ...isError, apellidoP: true });
        }else {
          newErrors.apellidoP = '';
          setIsError({ ...isError, apellidoP: false });
        }
      }

      if (name === InputId.apellidoM) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.apellidoM = formData[1].errorMessage.required;
          setIsError({ ...isError, apellidoM: true });
        }else if (value.trim().length < 4) {
          newErrors.apellidoM = formData[1].errorMessage.minLength;
          setIsError({ ...isError, apellidoM: true });
        }else if (!/^[a-zA-Z]+$/.test(value.trim())){
          newErrors.apellidoM = formData[1].errorMessage.invalid;
          setIsError({ ...isError, apellidoM: true });
        }else {
          newErrors.apellidoM = '';
          setIsError({ ...isError, apellidoM: false });
        }
      }

      if (name === InputId.fechaNacimiento) {
        errorFlag.current[name] = true;
        if (!value){
          newErrors.fechaNacimiento = formData[2].errorMessage.required;
          setIsError({ ...isError, fechaNacimiento: true });
        }else {
          newErrors.fechaNacimiento = '';
          setIsError({ ...isError, fechaNacimiento: false });
        }
      }

      if (name === InputId.correo) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.correo = formData[4].errorMessage.required;
          setIsError({ ...isError, correo: true });
        }else if (value.trim().length < 4) {
          newErrors.correo = formData[4].errorMessage.minLength;
          setIsError({ ...isError, correo: true });
        }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())){
          newErrors.correo = formData[4].errorMessage.invalid;
          setIsError({ ...isError, correo: true });
        }else if (value.trim().length > 6){
          fetch("http://localhost:3000/api/auth/users?correo=" + value.trim())
          .then(res => {
            if (!res.ok){
              newErrors.correo = formData[4].errorMessage.existe;
              setIsError({ ...isError, correo: true });
            }else {
              newErrors.correo = '';
              setIsError({ ...isError, correo: false });
            }
          })
        }else {
          newErrors.correo = '';
          setIsError({ ...isError, correo: false });
        }
      }

      if (name === InputId.rut) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.rut = formData[1].errorMessage.required;
          setIsError({ ...isError, rut: true });
        }else if (value.trim().length < 4) {
          newErrors.rut = formData[1].errorMessage.minLength;
          setIsError({ ...isError, rut: true });
        }else if (!/^\d{1,2}\d{3}\d{3}-[\dkK]$/.test(value.trim())){
          newErrors.rut = formData[1].errorMessage.invalid;
          setIsError({ ...isError, rut: true });
        }else {
          newErrors.rut = '';
          setIsError({ ...isError, rut: false });
        }
      }

      if (name === InputId.telefono) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.telefono = formData[8].errorMessage.required;
          setIsError({ ...isError, telefono: true });
        }else if (value.trim().length < 9) {
          newErrors.telefono = formData[8].errorMessage.minLength;
          setIsError({ ...isError, telefono: true });
        }else if (!/^\d+$/.test(value.trim())){
          newErrors.telefono = formData[8].errorMessage.invalid;
          setIsError({ ...isError, telefono: true });
        }else {
          newErrors.telefono = '';
          setIsError({ ...isError, telefono: false });
        }
      }

      if (name === InputId.contra) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.contra = formData[5].errorMessage.required;
          setIsError({ ...isError, contra: true });
        }else if (value.trim().length < 6) {
          newErrors.contra = formData[5].errorMessage.minLength;
          setIsError({ ...isError, contra: true });
        }else {
          newErrors.contra = '';
          setIsError({ ...isError, contra: false });
        }

        if (value.trim() !== registerData.confirmarContra.trim()){
          newErrors.confirmarContra = formData[6].errorMessage.invalid;
          setIsError({ ...isError, confirmarContra: true });
        }else {
          newErrors.confirmarContra = '';
          setIsError({ ...isError, confirmarContra: false });
        }
      }

      if (name === InputId.confirmarContra) {
        errorFlag.current[name] = true;
        if (value.trim() === ''){
          newErrors.confirmarContra = formData[6].errorMessage.required;
          setIsError({ ...isError, confirmarContra: true });
        }else if (value.trim().length < 6) {
          newErrors.confirmarContra = formData[6].errorMessage.minLength;
          setIsError({ ...isError, confirmarContra: true });
        }else if (value.trim() !== registerData.contra.trim()){
          newErrors.confirmarContra = formData[6].errorMessage.invalid;
          setIsError({ ...isError, confirmarContra: true });
        }else {
          newErrors.confirmarContra = '';
          setIsError({ ...isError, confirmarContra: false });
        }
      }

      return newErrors;
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validForm){
      fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      }).then((res) => {
        if (res.status === 201) {
          console.log("Registro exitoso")
          router.push("/login")
        }else if (res.status === 400) {
          console.log("Error en el formulario")
        }else {
          console.log("Error al enviar el formulario")
        }
      })
    }
  }

  useEffect(() => {
    const validateForm = () => {
      const isValid = Object.values(registerData).every(value => value !== "" && value !== null);
      const noErrors = Object.values(errors).every(error => error === '');
      return isValid && noErrors;
    }
    setValidForm(validateForm());
  }, [registerData, errors]);


  return (
    <form
      className="flex flex-col gap-3 p-8 w-full md:w-2/4 h-full bg-white rounded-lg shadow-2xl overflow-auto"
      onSubmit={handleSubmit}
    >
      {
        formData.map(({ id, text, type }) => (
          <InputForm
            key={ id }
            id={ id }
            text={ text }
            type={ type }
            handleChange={ handleChange }
            isError={ isError[id] }
            errorMessage={ errors[id] }
            errorFlag={ errorFlag.current[id] }
          />
        ))
      }
      <button className={`p-2.5 ${validForm ? "bg-[#0171D3] enabled" : "bg-slate-400 disabled cursor-not-allowed"} text-white rounded-lg`}>Enviar</button>
      <p>¿Ya tienes cuenta? <a href="/login" className="text-blue-500">Iniciar sesión</a></p>
    </form>
  )
}

interface InputFormProps {
  id: string;
  text: string;
  type: InputType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
  errorFlag: boolean;
}

const InputForm = ({ id, text, type, handleChange, isError, errorMessage, errorFlag }: InputFormProps) => {
  return (
    <>
      <label
        htmlFor={ id }
        className={`text-slate-500`}
      >{ text }</label>
      <div className={`flex items-center px-5 gap-2 border ${!errorFlag ? "border-black" : isError ? "border-red-500" : "border-green-500"} rounded-lg`}>
        <input
          onChange={ handleChange }
          type={type}
          min={"1900-01-01"}
          max={"2023-12-31"}
          id={ id }
          name={ id }
          className={`py-1.5 rounded-lg outline-none w-full`}
        />
        {
          !errorFlag ? null : isError ? <CloseIcon /> : <CheckIcon />
        }
      </div>
      <p className="text-red-500">
        { isError && errorMessage }
      </p>
    </>
  )
}