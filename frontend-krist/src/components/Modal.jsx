const Modal = ({ open, children, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "bg-black bg-opacity-50" : "bg-transparent"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
