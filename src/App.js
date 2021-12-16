import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./pages/Home/Home";
import UserContextProvider from "./context/userContext/UserContext";
import Profile from "./pages/profile/Profile";
import Layout from "./components/Layout/Layout";
import SnackbarContextProvider from "./context/snackbarContext/SnackbarContext";
import LoggedUserOrganizations from "./pages/organizations/LoggedUserOrganizations";
import ViewOrganization from "./pages/organizations/ViewOrganization";

function App() {
  return (
      <BrowserRouter>
          <UserContextProvider>
              <SnackbarContextProvider>
                  <Layout>
                      <Routes>
                          <Route path="/" element={<Home/>} />
                          <Route path="/profile" element={<Profile/>} />
                          <Route path="/my-organizations" element={<LoggedUserOrganizations/>} />
                          <Route path="/organization/:organizationId" element={<ViewOrganization/>} />
                          <Route path="*" element={<>Not Found</>} />
                      </Routes>
                  </Layout>
              </SnackbarContextProvider>
          </UserContextProvider>
      </BrowserRouter>
  );
}

export default App;
