import DividerScreen from "@/components/DividerScreen";
import Input from "@/components/Input";
import image from "@/assets/image-forgotPassword.webp";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/otp", { state: { email } });
  };

  return (
    <DividerScreen>
      <div className="flex-[2] flex items-center justify-center">
        <img
          src={image}
          alt="Girl in a tree see you"
          className="w-full h-full object-cover"
          width="100%"
          height="100%"
          loading="lazy"
        />
      </div>
      <div className="flex-[1] flex items-center justify-center">
        <div className="flex flex-col w-full max-w-[480px]">
          <Link
            to="/register"
            className="text-black w-28 flex items-center transition-all duration-300 ease-in-out hover:-translate-x-1 hover:opacity-80"
          >
            <ChevronLeft
              strokeWidth={1}
              className="transition-transform duration-300 ease-in-out"
            />
            Regresar
          </Link>
          <h1 className="font-bold text-[30px]">Recuperar contraseña</h1>
          <p className="mb-5 text-[#666] text-wrap">
            Por favor escribe tu correo electrónico. Te enviaremos un Codigo
            para recuperar tu contraseña
          </p>
          <form>
            <Input
              type="email"
              value={email}
              placeholder="Escribe tu correo electrónico"
              nameLabel="Correo Electronico"
              onChange={handleChange}
            />
            <Button text="Enviar otp" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </DividerScreen>
  );
};

export default ForgotPassword;
