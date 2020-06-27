<template>
	<BooleanValue #default="{ value: disabled, toggle: toggleDisabled }">
		<component
			:is="uid ? 'StoredNumberValue' : 'NumberValue'"
			:uid="uid"
			:defaultValue="defaultValue"
			:initialValue="initialValue"
			:min="1"
			:max="10"
			:disabled="disabled"
			#default="{ value, increment, decrement, isFirst, isLast, resetToDefault, resetToInitial }"
		>
			<div class="demo demo-with-actions">
				<CounterInput
					:value="value"
					:prevDisabled="isFirst"
					:nextDisabled="isLast"
					@prev="decrement"
					@next="increment"
				/>
				<div class="demo-actions">
					<a @click="resetToDefault">
						reset to default
					</a>
					<a @click="resetToInitial">
						reset to initial
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
import { BooleanValue, NumberValue, StoredNumberValue } from 'vue-values'
import CounterInput from '../CounterInput'
import DisabledActionInput from '../DisabledActionInput'

export default {
	components: { BooleanValue, NumberValue, StoredNumberValue, CounterInput, DisabledActionInput },
	props: {
		uid: String,
		defaultValue: Number,
		initialValue: Number,
	}
}
</script>
