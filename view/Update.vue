<template>
    <!--    <div class="cropper-container">-->
    <!--        <img :src="photo.url" ref="img">-->
    <!--        -->
    <!--    </div>-->
    <div class="title" v-if="!photo.edit">Обновление фото</div>
    <div class="title text-green-600" v-else>Успешно</div>
    <div class="img-cropper">
        <VueCropper
            ref="cropper"
            :src="photo.url"
            :background="false"
            :rotatable="false"
            :zoomable="false"
            :scalable="false"
        />
        <div class="form lg">
            <div class="form-input">
                <label for="name" class="text-center">Имя фотографии</label>
                <input type="text" v-model="photo.name" class="w-80" id="name">
            </div>
            <div class="form-submit" @click="submit">Обновить</div>
        </div>
    </div>
</template>

<script>
import {ref, reactive} from "vue";
import VueCropper from "vue-cropperjs"
import "cropperjs/dist/cropper.css"
import {useRoute} from "vue-router";
import {usePhoto} from "../composables/Photo";


export default {
    setup() {
        const route = useRoute()
        const {updatePhoto} = usePhoto()
        const cropper = ref(null)
        const photo = reactive({
            url: route.params.photo.url,
            name: route.params.photo.name,
            id: route.params.id,
            edit: false
        })
        const submit = async () => {
            const res = await updatePhoto(photo.id, photo.name, cropper.value.getCroppedCanvas().toDataURL())
            if (res.status == 200) {
                photo.edit = true
            }

            console.log(res.data)
        }
        return {
            photo,
            cropper,
            submit
        }
    },
    components: {
        VueCropper
    }
}


</script>
