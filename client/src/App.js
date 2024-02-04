import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
// components

import Form from "./components/Form.jsx";

// framer motion
import { motion as m } from "framer-motion";

const App = () => {
  return (
    <main className="flex justify-center w-full h-screen items-center">
      <Form />
    </main>
  );
};

export default App;
