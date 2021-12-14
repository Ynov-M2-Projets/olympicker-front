import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./pages/Home/Home";
import UserContextProvider from "./context/userContext/UserContext";
import Profile from "./pages/profile/Profile";
import Layout from "./components/Layout/Layout";
import Sports from "./pages/Sports/Sports";
import SnackbarContextProvider from "./context/snackbarContext/SnackbarContext";

function App() {
  return (
      <BrowserRouter>
          <UserContextProvider>
              <SnackbarContextProvider>
                  <Layout>
                      <Routes>
                          <Route path="/" element={<Home/>} />
                          <Route path="/profile" element={<Profile/>} />
                          <Route path="/sports" element={<Sports/>} />
                          <Route path="*" element={<>Not Found</>} />
                      </Routes>
                  </Layout>
              </SnackbarContextProvider>
          </UserContextProvider>
      </BrowserRouter>
  );
}

export default App;
