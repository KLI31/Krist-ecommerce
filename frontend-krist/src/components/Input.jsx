import { forwardRef } from "react";
import "@fontsource-variable/jost";

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  (
    { placeholder, value, name, nameLabel, onChange, errors = {}, type },
    ref
  ) => {
    return (
      <label htmlFor={name} className="font-normal flex flex-col">
        {nameLabel && <span>{nameLabel}:</span>}
        <input
          type={type}
          placeholder={placeholder}
          className={`p-4 border-2 border-solid border-black rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-black ${
            errors && errors[name] ? "border-red-500 mb-2" : ""
          }`}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref}
        />
        {errors && errors[name] && (
          <span className="text-red-500 text-sm">{errors[name].message}</span>
        )}
      </label>
    );
  }
);

export default Input;
