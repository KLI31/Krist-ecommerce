import DividerScreen from "@/components/DividerScreen";
import imageOtp from "@/assets/image-otp.webp";
import OtpInput from "@/components/Otp";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Check, X as ErrorIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [isValid, setIsValid] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || { email: "example123@gmail.com" };

  const verifyOTP = async () => {
    const isValidOTP = otp.join("") === "12345";
    setIsValid(isValidOTP);
    setOpen(true);

    // Aquí es donde normalmente harías una llamada a tu API
    // const response = await fetch('/api/verify-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ otp: otp.join('') })
    // })
    // const data = await response.json()
    // setIsValid(data.valid)
  };

  useEffect(() => {
    if (isValid) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isValid, navigate]);

  const handleModalClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <DividerScreen>
      <div className="flex-[2] flex justify-center items-center">
        <img
          src={imageOtp}
          alt="image left side person sitting on chair"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-[1] flex items-center justify-center">
        <div className="flex flex-col w-full max-w-[480px]">
          <Link
            to="/forgot-password"
            className="text-black w-28   flex items-center transition-all duration-300 ease-in-out hover:-translate-x-1 hover:opacity-80"
          >
            <ChevronLeft
              strokeWidth={1}
              className="transition-transform duration-300 ease-in-out"
            />
            Regresar
          </Link>
          <h1 className="font-bold text-[30px]">Codigo Otp</h1>
          <p className="mb-3 text-[#666] text-wrap">
            Te hemos enviado un código de verificación a tu correo electrónico:{" "}
            {email}
          </p>
          <div className="mt-4">
            <OtpInput otp={otp} setOtp={setOtp} onClick={() => verifyOTP()} />
          </div>
          <Modal open={open} onClose={() => handleModalClose}>
            <div className="flex flex-col items-center justify-center animate-fade-in animate-duration-300">
              <div className="relative flex items-center justify-center w-36 h-36 bg-gray-300 rounded-full mb-4 animate-scale-in animate-duration-300">
                <div className="absolute w-28 h-28 bg-[#131118] bg-opacity-20 rounded-full flex items-center justify-center animate-scale-in animate-delay-100">
                  <div className="absolute w-20 h-20 bg-[#131118] rounded-full flex items-center justify-center animate-scale-in animate-delay-200">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center animate-scale-in animate-delay-300">
                      {isValid ? (
                        <Check size={24} strokeWidth={3} />
                      ) : (
                        <ErrorIcon size={24} strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold">
                {isValid
                  ? "Contraseña cambiada correctamente"
                  : "Intenta de nuevo"}
              </h2>
              <p className="break-words">
                {isValid
                  ? "Tu contraseña ha sido cambiada exitosamente."
                  : "El codigo ingresado es incorrecto. Por favor, intenta de nuevo."}
              </p>
              <Button onClick={() => setOpen(false)} text="Cerrar" />
            </div>
          </Modal>
        </div>
      </div>
    </DividerScreen>
  );
};

export default OtpPage;
