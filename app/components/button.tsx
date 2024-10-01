type propbutton = {
  text: string;
  onClink: () => void;
  type?: "button" | "summit" | "reset";
  varible?: "primary" | "secundary";
  className?: "string";
};

const Button: React.FC<propbutton> = ({
  text,
  onClink,
  type = "button",
  varible = "primary",
  className = "",
}) => {
  const style = {
    primary: "text-white bg-blue-500 hover:bg-blue-600",
    secoondary: "text-black bg-gray-300 hover:bg-gray-400",
  };
  return (
    <button
      type={type}
      onClick={onClink}
      className={`px-4 py-2 font-semibold rounded focus:outline-none ${style[varible]} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
