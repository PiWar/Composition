<template>
    <nav class="sub__menu">
        <router-link class="sub__menu-item" :to="{ name: 'all' }">Все фото</router-link>
        <router-link class="sub__menu-item" :to="{ name: 'load' }">Загрузить фото</router-link>
        <router-link class="sub__menu-item" :to="{ name: 'share' }">Расшарить фото</router-link>
        <router-link class="sub__menu-item" :to="{ name: 'shareForYou' }">Расшаренные тебе</router-link>
    </nav>
    <Suspense>
        <router-view></router-view>
    </Suspense>
</template>

<script setup>

</script>

