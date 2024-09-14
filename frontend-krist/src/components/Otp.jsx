import { useRef, useEffect } from "react";
import Button from "@/components/Button";

export default function OTPInput({ otp, setOtp, onClick }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.target.value))) return false;

    setOtp([
      ...otp.map((d, idx) => (idx === index ? element.target.value : d)),
    ]);

    if (element.target.value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputGroup}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.input}
            aria-label={`Dígito ${index + 1} del OTP`}
          />
        ))}
      </div>
      <Button onClick={onClick} text="Verificar" />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
  },
  input: {
    width: "50px",
    height: "50px",
    fontSize: "24px",
    textAlign: "center",
    border: "2px solid #000",
    borderRadius: "10px",
    outline: "none",
    fontWeight: "bold",
  },

  message: {
    fontSize: "20px",
    fontWeight: "normal",
  },
  valid: {
    color: "#000",
  },
  invalid: {
    color: "#dc3545",
  },
  button: {
    width: "100%",
  },
};
