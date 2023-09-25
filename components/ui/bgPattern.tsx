const bgPattern = () => {
  return (
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: "url('/images/svg/topography.svg')",
        backgroundSize: "400px",
      }}
    ></div>
  );
};

export default bgPattern;
