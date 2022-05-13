<template>
    <div class="p-2 mx-auto my-1 w-5/6">
        <nav v-if="auth.isAuth" class="menu__row">
            <auth-menu />
        </nav>
        <nav v-else  class="menu__row">
            <no-auth-menu />
        </nav>
    </div>
</template>

<script setup>
import NoAuthMenu from "./menuComponents/NoAuthMenu"
import AuthMenu from "./menuComponents/AuthMenu"
import {useAuthStore} from "../store";

const {auth} = useAuthStore()
</script>
