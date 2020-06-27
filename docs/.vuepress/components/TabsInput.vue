<template>
	<div class="TabsInput">
		<a
			v-for="{ key, label } in tabs"
			:key="key"
			:class="{ active: key === value }"
			@click="$emit('input', key)"
		>
			{{ label }}
		</a>
	</div>
</template>

<script>
import { Value } from 'vue-values'

export default {
	name: 'TabsInput',
	props: {
		value: [String, Number],
		tabs: {
			type: [Array],
			required: true,
		},
	}
}
</script>

<style lang="scss" scoped>
.TabsInput {
	margin-bottom: 15px;
	a {
		border-bottom: 2px solid transparent;
		color: black;
		text-transform: uppercase;
		cursor: pointer;
		margin: 0 20px 5px 0;
		text-decoration: none !important;
		&.active, &:hover {
			border-color: #3eaf7c;
		}
	}
}
</style>