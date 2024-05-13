import React from "react";

function Loader() {
  const loaderStyle = {
    border: "6px solid rgb(214, 219, 223)",
    borderTop: "6px solid rgb(136, 136, 136)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  };

  const keyframesStyle = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div className="flex justify-center mt-[20rem]">
      <style>{keyframesStyle}</style>
      <div className="loader" style={loaderStyle}></div>
    </div>
  );
}

export default Loader;
