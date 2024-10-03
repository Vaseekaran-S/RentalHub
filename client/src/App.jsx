import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";

import { verifyAdminToken } from "api/admin";
import { verifyUserToken } from "api/users";

import Home from "pages/home";

import Admin from "pages/admin";
import AdminSignUp from "pages/admin/signup";
import AdminLogin from "pages/admin/login";

import AdminEquipments from "pages/admin/equipments";
import AddEquipment from "pages/admin/equipments/add";
import EditEquipment from "pages/admin/equipments/edit";
import EquipmentSingle from "pages/equipments/single";
import EquipmentAnalysis from "pages/admin/equipments/analysis";

import AdminProfile from "pages/admin/profile";
import EditAdminProfile from "pages/admin/profile/edit";

import Login from "pages/registration/login";
import Equipments from "pages/equipments";
import SignUp from "pages/registration/signup";
import ProfilePage from "pages/profile";
import { deleteAdmin, deleteUser } from "utils/getData";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("rentalhub-admin")
    const userToken = localStorage.getItem("rentalhub-user")
    if (token) {
      const checkToken = async () => {
        const verifyToken = await verifyAdminToken(token)
        if(!verifyToken) deleteAdmin()
        setIsAdmin(verifyToken)
      }
      checkToken()
    }else if(userToken){
      const checkToken = async () => {
        const verifyToken = await verifyUserToken(userToken)
        if(!verifyToken) deleteUser()
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
                <Route path="/equipments" element={<Equipments />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/equipments/:url" element={<EquipmentSingle />} />
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
              <Route path="/equipments" element={<AdminEquipments />} />
              <Route path="/equipments/add" element={<AddEquipment />} />
              <Route path="/equipments/edit/:url" element={<EditEquipment />} />
              <Route path="/equipments/:url/analysis" element={<EquipmentAnalysis />} />
              <Route path="/equipments/:url" element={<EquipmentSingle />} />
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
