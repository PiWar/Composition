<template>
    <div class="title" :class="{ 'text-green-600': title.succRegister}">{{ title.val }}</div>
    <div class="form">
        <div class="form-input">
            <label for="name">Имя:</label>
            <input type="text" id="name" v-model="form.first_name">
            <div class="error" v-if="errors.first_name">Поле не должно быть пустым</div>
        </div>
        <div class="form-input">
            <label for="fam">Фамилия:</label>
            <input type="text" id="fam" v-model="form.surname">
            <div class="error" v-if="errors.surname">Поле не должно быть пустым</div>
        </div>
        <div class="form-input">
            <label for="phone">Номер телефона:</label>
            <input type="text" id="phone" v-model="form.phone">
            <div class="error" v-if="errors.phone">Поле не должно быть пустым</div>
            <div class="error hidden">Требуемая длина 11 символов</div>
            <div class="error hidden">Только цифры</div>
        </div>
        <div class="form-input">
            <label for="pass">Пароль:</label>
            <input type="password" id="pass" v-model="form.password">
            <div class="error" v-if="errors.password">Поле не должно быть пустым</div>
        </div>
        <div type="submit" class="form-submit" @click="submit">Зарегистрироваться</div>
        <div class="info">
            У вас уже есть аккаунт? <router-link :to="{ name: 'login'}">войти</router-link>
        </div>
    </div>
</template>

<script setup>

import {reactive} from "vue";

import {useAuth} from "../composables/Auth";
import {useErrorForm} from "../composables/ErrorForm";
import {useRouter} from "vue-router";

const {errors, setErrors, resetErrors} = useErrorForm({
    first_name: "",
    surname: "",
    phone: "",
    password: "",
})
const {register} = useAuth()
const router = useRouter()

const form = reactive({
    first_name: "",
    surname: "",
    phone: "",
    password: "",
})
const title = reactive({
    val: "Регистрация",
    succRegister: false
})

const setTitle = () => {
    title.val = "Успешно"
    title.succRegister = true
}

const submit = async () => {
    const data = await register(form)
    const content = data.data.content ?? []
    if (data.status == 422) {
        setErrors(content)
    }
    if (data.status == 201) {
        resetErrors()
        setTitle()
        setTimeout(() => {
            router.push({name: 'login'})
        }, 2000)
    }

}

</script>

