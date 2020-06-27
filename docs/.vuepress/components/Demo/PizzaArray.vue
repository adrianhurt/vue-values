<template>
	<ArrayValue
		:initialValue="['Tomato sauce', 'Mozzarella', 'Basil']"
		#default="{ value: ingredients, append: addIngredient, removeIndex: removeIngredient, resetToDefault, resetToInitial }"
	>
		<div class="demo demo-with-actions">
			<div>
				<label>Create your definitive pizza</label>
				<StringValue #default="{ value: text, set: setText, reset: resetText }">
					<div class="input-group">
						<input
							type="text"
							:value="text"
							placeholder="add an ingredient"
							@input="setText($event.target.value)"
						/>
						<button @click="() => (text && addIngredient(text) && resetText())">
							Add
						</button>
					</div>
				</StringValue>
				<ul class="ingredient-list">
					<li
						v-for="(ingredient, index) in ingredients"
						:key="index"
					>
						{{ ingredient }}
						<a @click="removeIngredient(index)">
							remove
						</a>
					</li>
				</ul>
			</div>
			<div class="demo-actions">
				<a @click="resetToDefault">
					reset to default
				</a>
				<a @click="resetToInitial">
					reset to initial
				</a>
			</div>
		</div>
	</ArrayValue>
</template>

<script>
import { ArrayValue, StringValue } from 'vue-values'

export default {
	components: { ArrayValue, StringValue },
}
</script>

<style lang="scss" scoped>
.demo {
	label {
		display: block;
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 5px;
	}
	li a {
		font-size: 12px;
	}
}
</style>