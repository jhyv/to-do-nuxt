<template>
    <div class="default-page">
        <slot></slot>
    </div>
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