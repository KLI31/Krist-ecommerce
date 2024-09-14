import DividerScreen from "@/components/DividerScreen";
import image from "@/assets/image-register.webp";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data !== "") {
      navigate("/otp");
    }
  };

  const handleChange = (e) => {
    clearErrors(e.target.name);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Escribe tu nombre"
              nameLabel="Nombre"
              name="nombre"
              onChange={handleChange}
              errors={errors}
              {...register("nombre", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
              })}
            />
            <Input
              type="text"
              placeholder="Escribe tu apellido"
              nameLabel="Apellido"
              name="apellido"
              {...register("apellido", { required: false })}
              errors={errors}
            />
            <Input
              type="email"
              placeholder="Escribe tu correo electrónico"
              nameLabel="Correo electrónico"
              name="email"
              errors={errors}
              onChange={handleChange}
              {...register("email", {
                required: "Correo electrónico requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Correo electrónico inválido",
                },
              })}
            />
            <Input
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              nameLabel="Contraseña"
              onChange={handleChange}
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
              })}
              errors={errors}
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
