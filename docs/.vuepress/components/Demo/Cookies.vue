<template>
	<div class="demo">
		<StoredBooleanValue
			:uid="uid"
			#default="{ value: accepted, set, resetToDefault }"
		>
			<div>
				<transition name="cookie-transition">
					<div v-if="!accepted" class="CookieAlert">
						<p>The classic cookies alert message</p>
						<button @click="set(true)">Accept</button>
					</div>
				</transition>
				<div class="TextContainer">
					<div v-if="accepted">
						<p>Already accepted</p>
						<a @click="resetToDefault">Reset to default</a>
					</div>
					<div v-else>
						<p>Please, accept the cookies</p>
					</div>
				</div>
			</div>
		</StoredBooleanValue>
	</div>
</template>

<script>
import { StoredBooleanValue } from 'vue-values'

export default {
	components: { StoredBooleanValue },
	props: {
		uid: String,
	}
}
</script>

<style lang="scss" scoped>
.demo {
	height: 100px;
	position: relative;
}
.CookieAlert {
	position: absolute;
	bottom: 0;
	height: 40px;
	left: 0;
	width: 100%;
	padding: 0 15px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #3eaf7c;
}
.TextContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	p {
		margin-bottom: 0;
	}
}
.cookie-transition-enter-active, .cookie-transition-leave-active {
	transition: opacity .5s;
}
.cookie-transition-enter, .cookie-transition-leave-to {
	opacity: 0;
}
</style>