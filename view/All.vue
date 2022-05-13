<template>
        <div class="cont__photos">
            <div class="photos-item" v-for="photo in photos" :key="photo.key">
                <img :src="photo.url" :alt="photo.name">
                <div class="imgTitle">{{ photo.name }}</div>
                <div class="photo-control">
                    <div class="photo-delete" @click="del(photo.id)">
                        Удалить
                    </div>
                    <div class="photo-update" @click="upd(photo.id)">
                        Редактировать
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {usePhoto} from "../composables/Photo";
import {useRouter} from "vue-router";

const router = useRouter()
const photos = ref([])
const {getPhotos, delPhoto} = usePhoto()

const del = async id => {
    const res = await delPhoto(id)
    if (res.status == 204) {
        photos.value = photos.value.filter(item => item.id != id)
    }
}
const upd = id => {
    router.push({
        name: "update",
        params: {
            id,
        }
    })
}


onMounted(async () => {
    const res = await getPhotos()
    const content = res.data.content ?? []
    if (res.status == 200) {
        photos.value = content
    }
    console.log(res.data)
})
</script>
