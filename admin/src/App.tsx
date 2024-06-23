import {useEffect} from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const AppTheme = "dark";

const App = () => {
  useEffect(() => {
    document.body.classList.add(`${AppTheme}`);

    return () => {
      document.body.classList.remove(`${AppTheme}`);
    };
  }, [AppTheme]);

  return (
    <div className="relative min-h-dvh font-mono">
      <MainContent />
      <Sidebar />
      <Navbar />
    </div>
  );
};

export default App;
