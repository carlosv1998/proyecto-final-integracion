import { RegisterForm } from "@/components/RegisterForm";
import { SectionContainer } from "@/components/SectionContainer";

export default function Register() {
  
  return (
    <SectionContainer>
      <div className="w-full h-full flex flex-col gap-4 items-center">
        <h1 className="font-bold text-xl">Registro</h1>
        <RegisterForm />
      </div>
    </SectionContainer>
  )
}