import { Icon } from "lucide-react";

const Button = ({ onClick, text, leftIcon, righIcon, type = "submit" }) => {
  return (
    <button
      onClick={() => onClick()}
      type={type}
      className="btn relative w-full px-6 py-2 border-2 border-transparent rounded bg-black text-white cursor-pointer mt-3 transition-all duration-300 ease-in-out shadow-md hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-sm hover:border-black"
    >
      {leftIcon && <Icon size="1.5em" icon={leftIcon} />}
      {text}
      {righIcon && <Icon size="1.5em" icon={righIcon} />}
    </button>
  );
};

export default Button;
