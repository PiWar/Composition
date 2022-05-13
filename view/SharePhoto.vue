<template>
    <div class="title text-green-600" v-if="succ">Успешно</div>
    <div class="cont__photos">
        <div class="photos-item" v-for="photo in photos" :key="photo.key">
            <img :src="photo.url" :alt="photo.name">
            <div class="imgTitle">{{ photo.name }}</div>
            <div class="photo-control">
                <div class="photo-update col-span-2 border-green-600" @click="share(photo.id)"
                     :class="{ 'border-2 ': photo.selected}">
                    Выбрать
                </div>
            </div>
        </div>
    </div>
    <input type="text" v-if="sharePhotos.length"
           placeholder="Поиск пользователя"
           @input="debounceSearchUser"
           v-model="inputSearch"
           class="mx-auto mt-5 px-3 py-1 text-lg border-2 border-cyan-400 rounded-md w-1/5 flex"
    >
    <div class="w-4/6 flex flex-col items-start gap-y-2 mt-5 mx-auto py-2">
        <div v-for="user in findUser" :key="user.id"
             class="grid grid-cols-3 w-full gap-x-8 border-2 border-gray-200 py-2 px-4 text-lg rounded-md cursor-pointer"
             :class="{'border-2 border-green-600': user.selected }"
             @click="sharePhoto(user.id)">
            <p class="border-r border-black">{{ user.first_name }}</p>
            <p class="border-r border-black">{{ user.surname }}</p>
            <p>{{ user.phone }}</p>
        </div>
    </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {usePhoto} from "../composables/Photo";
import {useUser} from "../composables/User";
import {debounce} from "lodash";

const photos = ref([])
const sharePhotos = ref([])
const inputSearch = ref("")
const findUser = ref([])
const succ = ref(false)
const {getPhotos} = usePhoto()
const {searchUser: searchU, sharePhoto: shareP} = useUser()

const share = id => {
    const photo = photos.value.find(el => el.id == id)
    if (sharePhotos.value.includes(id)) {
        sharePhotos.value = sharePhotos.value.filter(val => val != id)
        photo.selected = false
    } else {
        sharePhotos.value.push(id)
        photo.selected = true
    }
    console.log(sharePhotos.value)
}
const sharePhoto = async id => {
    const res = await shareP(sharePhotos.value.join(","), id)
    if (res.status == 201) {
        succ.value = true
    }
}
const searchUser = async () => {
    const res = await searchU(inputSearch.value)
    if (res.status == 200) {
        findUser.value = res.data
    } else if (res.status == 404) {
        findUser.value = []
    }
}
const debounceSearchUser = debounce(searchUser, 1000)

onMounted(async () => {
    const res = await getPhotos()
    const content = res.data.content ?? []
    if (res.status == 200) {
        photos.value = content
    }
})
</script>
