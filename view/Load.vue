<template>
    <div class="cont">
        <div class="title">Загрузить фото</div>
        <div class="form">
            <div class="form-input">
                <label for="photo">Ваше фото:</label>
                <input type="file" name="photo" id="photo" @change="getPhoto">
                <div class="error" v-if="errors.photo">Обязательное поле</div>
            </div>
            <div class="form-submit" @click="submit">Загрузить</div>
        </div>
        <div class="succLoad" v-if="succLoad.status">
            <div class="title text-green-600">Успешно</div>
            <img :src="succLoad.url" alt="img">
            <div class="imgTitle">{{ succLoad.name }}</div>
        </div>
    </div>
</template>

<script setup>

import {usePhoto} from "../composables/Photo";
import {reactive} from "vue";
import {useErrorForm} from "../composables/ErrorForm";

const succLoad = reactive({
    url: "",
    name: "",
    status: false
})
const form = reactive({
    photo: null
})
const {errors, setErrors} = useErrorForm({
    photo: false
})
const {loadPhoto} = usePhoto()

const getPhoto = e => {
    const file = e.target.files[0]
    form.photo = file
    console.log(file);
}
const submit = async () => {
    const res = await loadPhoto(form.photo)
    const content = res.data.content ?? []
    if (res.status == 422) {
        setErrors(content)
        console.log(res.data)
    }
    if (res.status == 201) {
        succLoad.status = true
        succLoad.name = content.name
        succLoad.url = content.url
        console.log(content);
    }
}

</script>
