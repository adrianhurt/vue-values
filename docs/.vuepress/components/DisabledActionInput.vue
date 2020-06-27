<template>
	<a
		class="DisabledActionInput"
		:class="{ active: value }"
		@click="$emit('toggle')"
	>
		disabled: &nbsp;
		<SwitchInput
			size="small"
			:value="value"
		/>
	</a>
</template>

<script>
import SwitchInput from './SwitchInput.vue'

export default {
	name: 'DisabledActionInput',
	components: { SwitchInput },
	props: {
		value: {
			type: Boolean,
			default: false,
		},
	}
}
</script>

<style lang="scss" scoped>
$dangerColor: #c33;

.DisabledActionInput {
	display: flex;
	align-items: center;
	&.active {
		color: $dangerColor;
		&::v-deep .SwitchInput {
			background-color: $dangerColor;
		}
	}
}
</style>