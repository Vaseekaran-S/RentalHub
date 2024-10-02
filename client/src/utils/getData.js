
const getAdminEmail = () => localStorage.getItem("rentalhub-admin-email")

const getUserEmail = () => localStorage.getItem("rentalhub-user-email")

module.exports = {
    getAdminEmail,
    getUserEmail
}