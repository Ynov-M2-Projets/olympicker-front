import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./pages/Home";
import UserContextProvider from "./context/userContext/UserContext";
import Profile from "./pages/profile/Profile";
import Layout from "./components/Layout/Layout";

function App() {
  return (
      <BrowserRouter>
          <UserContextProvider>
              <Layout>
                  <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/profile" element={<Profile/>} />
                      <Route path="*" element={<>Not Found</>} />
                  </Routes>
              </Layout>
          </UserContextProvider>
      </BrowserRouter>
  );
}

export default App;
