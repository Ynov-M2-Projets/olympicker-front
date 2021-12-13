import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import UserContextProvider from "./context/userContext/UserContext";

function App() {
  return (
      <BrowserRouter>
          <UserContextProvider>
              <Header/>
              <Routes>
                  <Route path="/" element={<Home/>} />
              </Routes>
              <Footer/>
          </UserContextProvider>
      </BrowserRouter>
  );
}

export default App;
