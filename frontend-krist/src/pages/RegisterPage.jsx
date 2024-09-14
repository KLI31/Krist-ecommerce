import DividerScreen from "@/components/DividerScreen";
import image from "@/assets/image-register.webp";
import Input from "@/components/Input";
import Button from "@/components/Button";

const RegisterPage = () => {
  return (
    <DividerScreen>
      <div className="flex-[2] flex justify-center items-center">
        <img
          src={image}
          alt="image left side person sitting on chair"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-[1] flex items-center justify-center ">
        <div className="flex flex-col w-full max-w-[480px]">
          <h1 className="font-bold text-[30px]">Crea una nueva cuenta</h1>
          <p className="mb-3 text-[#666]">
            Por favor escribe todos los detalles
          </p>
          <form>
            <Input
              type="text"
              placeholder="Escribe tu nombre"
              nameLabel="Nombre"
            />
            <Input
              type="text"
              placeholder="Escribe tu apellido"
              nameLabel="Apellido"
            />
            <Input
              type="email"
              placeholder="Escribe tu correo electrónico"
              nameLabel="Correo electrónico"
            />
            <Input
              type="password"
              placeholder="Escribe tu contraseña"
              nameLabel="Contraseña"
            />

            <div className="flex items-center mb-5">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="mr-2 mb-1"
              />
              <label htmlFor="terms">
                Estoy de acuerdo con los{" "}
                <a className="text-black font-bold cursor-pointer relative no-underline hover:no-underline after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:bottom-[-2px] after:left-0 after:transform after:scale-x-0 after:transition-all after:ease-in-out after:duration-300 hover:after:scale-x-100">
                  Términos & Condiciones
                </a>
              </label>
            </div>
            <Button text="Registrarse" />
          </form>
        </div>
      </div>
    </DividerScreen>
  );
};

export default RegisterPage;
