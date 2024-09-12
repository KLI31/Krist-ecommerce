import Input from "@/components/Input";

const HomePage = () => {
  return (
    <>
      <h2>Ecommerce Krist </h2>
      <h3>Form</h3>
      <form action="" className="w-[490px]">
        <Input
          placeHolder="Escribe tu nombre"
          name="nombre"
          nameLabel="Nombre"
        />
        <Input
          placeHolder="Escribe tu nombre"
          name="nombre"
          nameLabel="Nombre"
        />
        <Input
          placeHolder="Escribe tu nombre"
          name="nombre"
          nameLabel="Nombre"
        />
      </form>
    </>
  );
};

export default HomePage;
