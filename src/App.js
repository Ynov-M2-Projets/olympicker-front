import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./pages/Home";
import Header from "./components/header/header";
import Footer from "./components/footer/Footer";

function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
