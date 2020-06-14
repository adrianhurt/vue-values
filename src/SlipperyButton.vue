<template>
    <div class="Container">
        <div
            class="ButtonWrapper"
            :style="{ left: `${x}%`, top: `${y}%` }"
            @mouseenter="move"
        >
            <button @click="handleClick">
                Click me!
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlipperyButton',
    data () {
        return {
            x: 50,
            y: 0,
        }
    },
    methods: {
        move () {
            const { x, y } = this.newRandomCoordinates()
            this.x = x
            this.y = y
        },
        newRandomCoordinates () {
            const { x, y } = this
            const newX = Math.round(Math.random() * 100)
            const newY = Math.round(Math.random() * 100)
            return Math.abs(newX - x) > 25 && Math.abs(newY - y) > 25
                ? { x: newX, y: newY }
                : this.newRandomCoordinates()
        },
        handleClick () {
            // eslint-disable-next-line no-alert
            alert('Great!')
        },
    },
}
</script>

<style lang="scss" scoped>
$buttonWidth: 150px;
$buttonHeight: 40px;
$wrapperPadding: 20px;
$wrapperWidth: $buttonWidth + 2 * $wrapperPadding;
$wrapperHeight: $buttonHeight + 2 * $wrapperPadding;
$wrapperHalfWidth: $wrapperWidth / 2;
$wrapperHalfHeight: $wrapperHeight / 2;

.Container {
    position: relative;
    height: 400px;
	min-width: 400px;
	margin: #{$wrapperHalfHeight} #{$wrapperHalfWidth};

    .ButtonWrapper {
        position: absolute;
		margin: #{-$wrapperHalfHeight} 0 0 #{-$wrapperHalfWidth};
        padding: 20px;
        transition: all 0.5s;
    }

    button {
		width: $buttonWidth;
		line-height: $buttonHeight;
        border-radius: 12px;
		background: white;
		border: 2px solid #2c3e50;
        font-size: 16px;
		font-weight: bold;
		text-align: center;
        outline: none;
    }
}
</style>
