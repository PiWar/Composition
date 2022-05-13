<template>
    <Menu />
    <router-view></router-view>
<!--    <Suspense>-->
<!--        <FastLogin />-->
<!--    </Suspense>-->
</template>

<script setup>
import Menu from "../components/Menu"
import {onUnmounted} from "vue";
import {useAuth} from "../composables/Auth";
import FastLogin from "../components/FastLogin"

const {logout} = useAuth()

onUnmounted( () => logout())

</script>
