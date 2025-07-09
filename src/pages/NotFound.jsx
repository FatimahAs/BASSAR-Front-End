import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF6BD]">
      {/* <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div> */}
      <DotLottieReact
        src="https://lottie.host/70f037df-4213-428e-a666-b70ae44abbea/PMne1YY7NA.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default NotFound;
