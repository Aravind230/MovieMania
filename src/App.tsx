import "./styles.css";
import Nav from "./componenets/navbar";
import Body from "./componenets/home";
import Home from "./componenets/newhomepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav/>}></Route>
          <Route path="/"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
