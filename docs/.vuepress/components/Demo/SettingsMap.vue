<template>
	<component
		:is="uid ? 'StoredMapValue' : 'MapValue'"
		:uid="uid"
		:initialValue="initialValue"
		#default="{ value: settings, setValue, resetToInitial }"
	>
		<div class="demo demo-with-actions">
			<div class="settings">
				<div
					v-for="{ key, label } in options"
					:key="key"
					class="settings-item"
				>
					<label>{{ label }}</label>
					<SwitchInput :value="settings.get(key)" @input="setValue(key, $event)" />
				</div>
			</div>
			<div class="demo-actions">
				<a @click="resetToInitial">
					reset to initial
				</a>
			</div>
		</div>
	</component>
</template>

<script>
import { MapValue, StoredMapValue } from 'vue-values'
import SwitchInput from '../SwitchInput'

export default {
	components: { MapValue, StoredMapValue, SwitchInput },
	props: {
		uid: String,
		initialValue: Map,
	},
	created () {
		this.options = [
			{ key: 'darkmode', label: 'Darkmode' },
			{ key: 'newsletter', label: 'Subscribed to newsletter' },
			{ key: 'bigFontSize', label: 'Bigger font size' },
		]
	},
}
</script>

<style lang="scss" scoped>
.settings {
	&-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		& + & {
			margin-top: 10px;
		}
		label {
			margin-right: 30px;
		}
	}
}
</style>
