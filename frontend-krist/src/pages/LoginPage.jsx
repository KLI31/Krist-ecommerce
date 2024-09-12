import DividerScreen from "@/components/DividerScreen";
import image from "@/assets/image-login.webp";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import kristLogo from "@/assets/IconKrist.svg";

const LoginPage = () => {
  return (
    <DividerScreen>
      <div className="flex-[2] flex items-center justify-center">
        <img
          src={kristLogo}
          alt="Krist logo"
          className="absolute top-3 left-4"
        />
        <img
          src={image}
          alt="Woman watching camera"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-[1] flex items-center justify-center">
        <div className="flex flex-col w-full max-w-[480px]">
          <h1 className="font-bold text-[30px]">Iniciar Sesión</h1>
          <p className="mb-3 text-[#666]">Por favor escribe tus credenciales</p>
          <form>
            <Input
              type="text"
              placeholder="Escribe tu correo electrónico"
              nameLabel="Correo electrónico"
            />
            <Input
              type="text"
              placeholder="Escribe tu contraseña"
              nameLabel="Contraseña"
            />
            <div className="flex items-center justify-between mb-5">
              <div className="">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-2 mb-1"
                />
                <label htmlFor="remember">Recuerdame</label>
              </div>

              <Link
                to="/forgot-password"
                className="text-black font-normal cursor-pointer relative no-underline hover:no-underline after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:bottom-[-2px] after:left-0 after:transform after:scale-x-0 after:transition-all after:ease-in-out after:duration-300 hover:after:scale-x-100"
              >
                Olvide mi contraseña
              </Link>
            </div>
            <Button text="Iniciar Sesión" />
          </form>
        </div>
      </div>
    </DividerScreen>
  );
};

export default LoginPage;
