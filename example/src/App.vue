<template>
    <div id="app">
        <img
            alt="Vue logo"
            src="./assets/logo.png"
        >
        <h1>Try your own Vue.js package</h1>
        <p>Please, click the button</p>
        <SlipperyButton />
    </div>
</template>

<script>
import SlipperyButton from '@adrianhurt/package-vue-canvas'

export default {
    name: 'App',
    components: { SlipperyButton },
}
</script>

<style lang="scss" scoped>
@import '~@adrianhurt/package-vue-canvas/dist/package-vue-canvas.css';

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
