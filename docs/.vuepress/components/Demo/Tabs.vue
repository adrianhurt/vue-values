<template>
	<Value
		defaultValue="first-tab"
		#default="{ value: selectedTab, set: selectTab }"
	>
		<div class="demo">
			<TabsInput
				:value="selectedTab"
				:tabs="[
					{ key: 'first-tab', label: 'First tab' },
					{ key: 'second-tab', label: 'Second tab' },
					{ key: 'third-tab', label: 'Third tab' },
				]"
				@input="selectTab"
			/>
			<div class="demo-tab-contents">
				<div v-if="selectedTab === 'first-tab'">
					First content
				</div>
				<div v-else-if="selectedTab === 'second-tab'">
					Second content
				</div>
				<div v-else-if="selectedTab === 'third-tab'">
					Third content
				</div>
			</div>
		</div>
	</Value>
</template>

<script>
import { Value } from 'vue-values'
import TabsInput from '../TabsInput.vue'

export default {
	components: { Value, TabsInput },
}
</script>
