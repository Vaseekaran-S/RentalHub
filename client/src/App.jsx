import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";

import { verifyAdminToken } from "api/admin";
import { verifyUserToken } from "api/users";

import Home from "pages/home";

import Properties from "pages/properties";
import AdminLogin from "pages/admin/login";
import Admin from "pages/admin";
import AddProperty from "pages/admin/properties/add";
import PropertySingle from "pages/properties/single";
import AdminProperties from "pages/admin/properties";
import EditProperty from "pages/admin/properties/edit";
import AdminProfile from "pages/admin/profile";
import EditAdminProfile from "pages/admin/profile/edit";
import Login from "pages/registration/login";
import SignUp from "pages/registration/signup";
import PropertyAnalysis from "pages/admin/properties/analysis";
import ProfilePage from "pages/profile";
import AdminSignUp from "pages/admin/signup";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("rentalhub-admin")
    const userToken = localStorage.getItem("rentalhub-user")
    if (token) {
      const checkToken = async () => {
        const verifyToken = await verifyAdminToken(token)
        setIsAdmin(verifyToken)
      }
      checkToken()
    }else if(userToken){
      const checkToken = async () => {
        const verifyToken = await verifyUserToken(userToken)
        setIsAuthenticated(verifyToken)
      }
      checkToken()
    }
  }, [])

  return (
    <BrowserRouter >
      <Layout isAdmin={isAdmin}>
        <Routes>
          {!isAdmin ? (
            isAuthenticated ?
              <>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/properties/:url" element={<PropertySingle />} />
                <Route path="/admin" element={<AdminProfile setIsAdmin={false} />} />
                <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
              </>
              :
              <>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/*" element={<Login />} />
                <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
                <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
                <Route path="/admin-signup" element={<AdminSignUp setIsAdmin={setIsAdmin} />} />
              </>
          ) :
            <>
              <Route path="/" element={<Admin />} />
              <Route path="/properties" element={<AdminProperties />} />
              <Route path="/properties/add" element={<AddProperty />} />
              <Route path="/properties/edit/:url" element={<EditProperty />} />
              <Route path="/properties/:url/analysis" element={<PropertyAnalysis />} />
              <Route path="/properties/:url" element={<PropertySingle />} />
              <Route path="/profile" element={<AdminProfile />} />
              <Route path="/profile/edit" element={<EditAdminProfile />} />
            </>
          }
        </Routes>
      </Layout>
    </BrowserRouter >
  );
}

export default App;
