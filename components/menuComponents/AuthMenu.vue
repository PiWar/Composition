<template>
    <img src="images/logo.png" alt="logo" class="menu-logo">
    <div class="flex gap-x-4 text-base items-center">
        <p class="user-info">Привет {{ auth.userName }}!</p>
        <a class="menu-link" @click.prevent="submitLogout">Выйти</a>
    </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {useAuth} from "../../composables/Auth";
import {useAuthStore} from "../../store";

const router = useRouter()
const {logout} = useAuth()
const {setIsAuth, auth} = useAuthStore()

const submitLogout = async () => {
    const res = await logout()
    if (res) {
        setIsAuth(false)
        router.push({
            name: "login"
        })
    }
}

</script>
