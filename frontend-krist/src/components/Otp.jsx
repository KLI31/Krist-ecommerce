import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

export default function OTPInput() {
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
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

  const verifyOTP = async () => {
    const isValidOTP = otp.join("") === "12345";
    setIsValid(isValidOTP);
    setOpen(true);
    setShowMessage(true);

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
    if (isValid !== null) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isValid]);

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
      <Button onClick={() => verifyOTP()} text="Verificar" />
      {/* <button onClick={() => setOpen(true)}>Modal</button> */}
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div>
            <h2>{isValid ? "¡Éxito!" : "Error"}</h2>
            <button onClick={() => setOpen(false)}>Cerrar</button>
          </div>
        </Modal>
      )}
      {showMessage && isValid !== null && (
        <p
          style={{
            ...styles.message,
            ...(isValid ? styles.valid : styles.invalid),
          }}
        >
          {isValid ? "OTP válido!" : "OTP inválido. Intenta de nuevo."}
        </p>
      )}
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
