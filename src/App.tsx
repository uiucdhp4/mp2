import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Home";
import "./App.css";
import Detail from "./pages/Detail";
import Gallery from "./pages/Gallery";


function App() {
  return (
    <BrowserRouter basename="/mp2">
      <Routes>
        <Route path="/" element={<Test/>} />
        <Route path="/asset/:id" element={<Detail/>} />
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;