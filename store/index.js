import {reactive} from "vue";

const auth = reactive({
    isAuth: false,
    userName: ""
})

export const useAuthStore = () => {

    const setIsAuth = val => auth.isAuth = val
    const setUserName = val => auth.userName = val

    return {
        auth,
        setIsAuth,
        setUserName
    }
}


