<template>
    <input type="text"
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
    <div class="cont__photos" v-if="photos.length">
        <div class="photos-item" v-for="photo in photos" :key="photo.key">
            <img :src="photo.url" :alt="photo.name">
            <div class="imgTitle">{{ photo.name }}</div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {debounce} from "lodash";
import {useUser} from "../composables/User";

const inputSearch = ref("")
const findUser = ref([])
const {searchUser: searchU, shareYou} = useUser()
const photos = ref([])

const searchUser = async () => {
    const res = await searchU(inputSearch.value)
    if (res.status == 200) {
        findUser.value = res.data
    } else if (res.status == 404) {
        findUser.value = []
    }
}
const debounceSearchUser = debounce(searchUser, 1000)
const sharePhoto = async id => {
    const res = await shareYou(id)
    if (res.status == 200) {
        photos.value = res.data.data.to
    }

}

</script>
