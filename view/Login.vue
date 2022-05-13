<template>
    <div class="title">Аутентификация</div>
    <div class="form">
        <div class="form-input">
            <label for="login">Телефон:</label>
            <input type="text" id="login" v-model="form.phone">
            <div class="error" v-if="errors.phone">Поле не должно быть пустым</div>
        </div>
        <div class="form-input">
            <label for="pass">Пароль:</label>
            <input type="password" id="pass" v-model="form.password">
            <div class="error" v-if="errors.password">Поле не должно быть пустым</div>
        </div>
        <div class="error" v-if="errors.login">Неправильный логин или пароль</div>
        <div class="form-submit" @click="submit">Войти</div>
        <div class="info">
            Если у вас нет аккаунта?
            <router-link :to="{ name: 'register'}">зарегистрируйтесь</router-link>
        </div>
    </div>
</template>

<script setup>

import {reactive} from "vue";

import {useAuth} from "../composables/Auth";
import {useErrorForm} from "../composables/ErrorForm";
import {useRouter} from "vue-router";
import {useAuthStore} from "../store";

const {login} = useAuth()
const {setIsAuth, setUserName, auth} = useAuthStore()
const router = useRouter()
const {errors, setErrors} = useErrorForm({
    phone: false,
    password: false,
    login: false
})

const form = reactive({
    phone: "",
    password: "",
})

const submit = async () => {
    const data = await login(form)
    const content = data.data.content ?? []
    if (data.status == 404 || data.status == 422) {
        setErrors(content)
        console.log(content);
    }
    if (data.status == 200) {
        setUserName(content.user.first_name)
        console.log(auth.userName);
        setIsAuth(true)
        router.push({
            name: "home"
        })
    }
}

</script>

