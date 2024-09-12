// Supports weights 100-900
import "@fontsource-variable/jost";

const Input = ({ placeholder, value, name, nameLabel, onChange }) => {
  return (
    <label htmlFor={name} className="font-normal flex flex-col">
      {nameLabel && <span>{nameLabel}:</span>}
      <input
        placeholder={placeholder}
        className="p-4 border-2 border-solid border-black rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-black"
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
