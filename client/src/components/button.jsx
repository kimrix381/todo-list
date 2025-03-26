const Button = ({ children, backgroundColor }) => {
  return (
    <button
      className={`${backgroundColor} p-2 rounded text-white w-full cursor-pointer duration-300 hover:bg-green-600`}
      type="submit"
    >
      {children}
    </button>
  );
};

export { Button };
