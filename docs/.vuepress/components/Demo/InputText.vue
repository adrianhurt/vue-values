<template>
	<StringValue #default="{ value, set, resetToDefault, reset }">
		<div class="demo demo-with-actions">
			<input
				type="text"
				:value="value"
				placeholder="Type something..."
				@input="set($event.target.value)"
			/>
			<p>
				<b>Typed:</b>
				<span>{{ value }}</span>
			</p>
			<div class="demo-actions">
				<a @click="reset">
					reset
				</a>
			</div>
		</div>
	</StringValue>
</template>

<script>
import { StringValue, BooleanValue } from 'vue-values'
import DisabledActionInput from '../DisabledActionInput'

export default {
	components: { StringValue, BooleanValue, DisabledActionInput },
}
</script>

<style lang="scss" scoped>
.demo input + p {
	flex: 1;
	margin-left: 15px;
}
</style>
