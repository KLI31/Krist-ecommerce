import DividerScreen from "@/components/DividerScreen";
import imageOtp from "@/assets/image-otp.webp";
import OtpInput from "@/components/Otp";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const OtpPage = () => {
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
            Te hemos enviado un código de verificación a tu correo electrónico
            example12@gmail.com
          </p>
          <div className="mt-4">
            <OtpInput />
          </div>
        </div>
      </div>
    </DividerScreen>
  );
};

export default OtpPage;
