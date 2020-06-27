/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueValuesStore from 'vue-values'

// Mocks localStorage for SSR
let storage = typeof localStorage !== 'undefined' ? localStorage : undefined
if (!storage) {
	let store = ''
	storage = {
		getItem: () => store,
		setItem: (key, value) => (store = value)
	}
}

// Declare here the default values for StoredValue components
const VUE_VALUES_DEFAULT_STATE = {
	'demo.persisted-counter': 1,
	'demo.persisted-settings': { darkmode: true, newsletter: true, bigFontSize: false },
}
// Declare here the initial values for StoredValue components
const VUE_VALUES_INITIAL_STATE = {
	'demo.persisted-counter': 3,
	'demo.persisted-settings': { darkmode: true, newsletter: true, bigFontSize: false },
}
// Declare here those stored values you want to persist in local storage
const VUE_VALUES_TO_PERSIST = {
	'demo.persisted-counter': true,
	'demo.persisted-settings': true,
}

// Gets the whole store from the local storage
function getWholeVueValuesStoreFromLocalStorage () {
	return JSON.parse(storage.getItem('VueValueStore') || '{}')
}
// Saves the whole store into the local storage
function saveWholeVueValuesStoreIntoLocalStorage (store) {
	storage.setItem('VueValueStore', JSON.stringify(store))
}
// Saves a single value into the local storage
function saveVueValueIntoLocalStorage (uid, value) {
	const store = getWholeVueValuesStoreFromLocalStorage()
	store[uid] = value
	saveWholeVueValuesStoreIntoLocalStorage(store)
}
// Deletes a single value from the local storage
function deleteVueValueFromLocalStorage (uid) {
	const store = getWholeVueValuesStoreFromLocalStorage()
	delete store[uid]
	saveWholeVueValuesStoreIntoLocalStorage(store)
}

// Initializes the default, initial and current store
VueValuesStore.setDefaultState(VUE_VALUES_DEFAULT_STATE)
VueValuesStore.setInitialState(VUE_VALUES_INITIAL_STATE)
VueValuesStore.setState(
	Object.assign(
		{},
		VUE_VALUES_DEFAULT_STATE,
		VUE_VALUES_INITIAL_STATE,
		getWholeVueValuesStoreFromLocalStorage(),
	)
)

// Sets the updating handlers
VueValuesStore.setUpdatingHandlers({
	onSet: (uid, value) => {
		if (VUE_VALUES_TO_PERSIST[uid]) {
			saveVueValueIntoLocalStorage(uid, value)
		}
		if (uid === 'demo.persisted-settings') {
			console.log(value)
		}
		return value
	},
	onDelete: (uid) => {
		if (VUE_VALUES_TO_PERSIST[uid]) {
			deleteVueValueFromLocalStorage(uid)
		}
	},
})

export default ({
	Vue, // the version of Vue being used in the VuePress app
	options, // the options for the root Vue instance
	router, // the router instance for the app
	siteData // site metadata
}) => {
	// ...apply enhancements for the site.
}
