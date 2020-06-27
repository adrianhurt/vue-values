<template>
	<div
		class="SwitchInput"
		:class="[size, { active: value }]"
		@click="$emit('input', !value)"
	/>
</template>

<script>
export default {
	name: 'SwitchInput',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		size: String,
	}
}
</script>

<style lang="scss" scoped>
$thumbSize: 26px;
$thumbSizeSmall: 13px;
$padding: 4px;
$paddingSmall: 2px;
$animDuration: 0.4s;

.SwitchInput {
	position: relative;
	width: 2 * ($thumbSize + $padding);
	height: $thumbSize + 2 * $padding;
	border-radius: $thumbSize;
	background-color: #2c3e50;
	transition: background-color $animDuration;
	cursor: pointer;

	&:before {
		content: '';
		position: absolute;
		top: $padding;
		left: $padding;
		transition: left $animDuration;
		width: $thumbSize;
		height: $thumbSize;
		border-radius: $thumbSize;
		background-color: white;
	}
	&.active {
		background: #3eaf7c;
		&:before {
			left: $padding + $thumbSize;
		}
	}

	&.small {
		width: 2 * ($thumbSizeSmall + $paddingSmall);
		height: $thumbSizeSmall + 2 * $paddingSmall;
		&:before {
			top: $paddingSmall;
			left: $paddingSmall;
			width: $thumbSizeSmall;
			height: $thumbSizeSmall;
		}
		&.active {
			&:before {
				left: $paddingSmall + $thumbSizeSmall;
			}
		}
	}
}
</style>