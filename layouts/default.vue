<template>
    <v-app>
        <div class="default-page">
            <slot></slot>
        </div>
    </v-app>
</template>

<style lang="scss" scoped>
.default-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #00DC82, #1DE0B1, #36E4DA);
}
</style>