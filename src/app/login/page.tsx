import { LoginForm } from "@/components/LoginForm";
import { SectionContainer } from "@/components/SectionContainer";

export default function Login() {
  return (
    <SectionContainer>
      <div className="w-full h-full flex justify-center items-center">
        <LoginForm />
      </div>
    </SectionContainer>
  )
}