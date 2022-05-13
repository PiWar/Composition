import axios from "axios";
import {useAuthStore} from "../store";
const {getToken} = useAuthStore()

export const useAuth = () => {
    const login = async (data) => {
        try{
            const res = await axios.post("/photos/api/login", data)
            return res
        } catch (e) {
            return e.response
        }
    }
    const register = async (data) => {
        try{
            const res = await axios.post("/photos/api/signup", data)
            return res
        } catch (e) {
            console.log(e.response)
            return e.response
        }
    }
    const logout = async () => {
        try{
            const res = await axios.post("/photos/api/logout")
            const code = res.status
            return code == 200 ? true : false;
        } catch (e) {
            return false
        }
    }

    return {
        login,
        register,
        logout
    }
}
