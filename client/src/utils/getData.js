
const adminToken = "rentalhub-admin"
const adminEmail = "rentalhub-admin-email"

const getAdminEmail = () => localStorage.getItem(adminEmail)
const deleteAdmin = () => {
    localStorage.removeItem(adminToken)
    localStorage.removeItem(adminEmail)
}


const userToken = "rentalhub-user"
const userEmail = "rentalhub-user-email"

const getUserEmail = () => localStorage.getItem(userEmail)
const deleteUser = () => {
    localStorage.removeItem(userToken)
    localStorage.removeItem(userEmail)
}


module.exports = {
    getAdminEmail,
    getUserEmail,
    deleteAdmin,
    deleteUser
}