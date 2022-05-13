<template>
    <p></p>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useAuthStore} from "../store";
import {useAuth} from "../composables/Auth";
import axios from "axios";

const {setUserName, setIsAuth} = useAuthStore()
const {login} = useAuth()

const router = useRouter()
onMounted(async () => {
    try {
        const res = await axios.get("/photos/api/me")
        if (res.status == 200) {
            const content = res.data.content
            setUserName(content.user.first_name)
            setIsAuth(true)
            router.push({
                name: "home"
            })
        }
    } catch {
        const data = await login({
            phone: 12312312312,
            password: "a"
        })
        if (data.status == 200) {
            const content = data.data.content
            setUserName(content.user.first_name)
            setIsAuth(true)
            router.push({
                name: "home"
            })
        }
    }

})
</script>
