import "./App.css";
import { useEffect, useState } from "react";
import MainContent from "./components/MainContent";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <SplashScreen
            className={`splash-screen ${fadeOut ? "fadeOut" : ""} `}
          />
        </div>
      ) : (
        <MainContent />
      )}
    </>
  );
}

export default App;
