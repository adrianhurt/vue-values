<template>
	<div class="CounterInput">
		<a
			class="prev"
			:class="{ disabled: prevDisabled }"
			@click="$emit('prev')"
		>
			&larr;
		</a>
		<div class="value">
			{{ value }}
		</div>
		<a
			class="next"
			:class="{ disabled: nextDisabled }"
			@click="$emit('next')"
		>
			&rarr;
		</a>
	</div>
</template>

<script>
export default {
	name: 'CounterInput',
	props: {
		value: {
			type: Number,
			default: 1,
		},
		prevDisabled: {
			type: Boolean,
			default: false,
		},
		nextDisabled: {
			type: Boolean,
			default: false,
		},
	}
}
</script>

<style lang="scss" scoped>
.CounterInput {
	display: flex;
	align-items: center;
	font-size: 16px;
	a {
		cursor: pointer;
	}
	.value {
		font-size: 20px;
		font-weight: bold;
		width: 25px;
		text-align: center;
		margin: 0 10px;
	}
	.disabled {
		opacity: 0.5;
		pointer-events: none;
	}
}
</style>