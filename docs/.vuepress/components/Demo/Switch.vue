<template>
	<BooleanValue #default="{ value: disabled, toggle: toggleDisabled }">
		<component
			:is="uid ? 'StoredBooleanValue' : 'BooleanValue'"
			:uid="uid"
			:initialValue="true"
			:disabled="disabled"
			#default="{ value, set, toggle }"
		>
			<div class="demo demo-with-actions">
				<SwitchInput :value="value" @input="set" />
				<div class="demo-actions">
					<a @click="toggle">
						toggle
					</a>
					<DisabledActionInput
						:value="disabled"
						@toggle="toggleDisabled"
					/>
				</div>
			</div>
		</component>
	</BooleanValue>
</template>

<script>
import { BooleanValue, StoredBooleanValue } from 'vue-values'
import SwitchInput from '../SwitchInput.vue'
import DisabledActionInput from '../DisabledActionInput'

export default {
	components: { BooleanValue, StoredBooleanValue, SwitchInput, DisabledActionInput },
	props: {
		uid: String,
	}
}
</script>
