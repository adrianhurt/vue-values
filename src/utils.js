import { reactive } from 'vue'

export function firstDefined (...vals) {
    return vals.find((v) => v !== undefined)
}

export function isObject (obj) {
    return typeof obj === 'object' && obj !== null
}

function existsFieldInObject (obj, fieldName) {
    return Object.prototype.hasOwnProperty.call(obj, fieldName)
}
export function existsPathInObject (obj, path) {
    const section = path.split('.')
    let node = obj
    for (let i = 0; i < section.length; i += 1) {
        if (!existsFieldInObject(node, section[i])) {
            return false
        }
        node = node[section[i]]
    }
    return true
}

function getParentNodeAndLastSection (uid, obj, { isReactive = false } = {}) {
    const sections = uid.split('.')
    let node = obj
    for (let i = 0; i < sections.length - 1; i += 1) {
        if (!existsFieldInObject(node, sections[i])) {
            node[sections[i]] = isReactive ? reactive({}) : {}
        }
        node = node[sections[i]]
    }
    return [node, sections[sections.length - 1]]
}

export function getValueFromObject (uid, obj, { defaultValue = undefined, isReactive = false } = {}) {
    const [parent, lastSection] = getParentNodeAndLastSection(uid, obj, { isReactive })
    if (!existsFieldInObject(parent, lastSection)) {
        parent[lastSection] = isObject(defaultValue) && isReactive ? reactive(defaultValue) : defaultValue
    }
    return parent[lastSection]
}
export function setValueIntoObject (uid, obj, newValue) {
    const [parent, lastSection] = getParentNodeAndLastSection(uid, obj)
    parent[lastSection] = newValue
    return newValue
}
export function setReactiveValueIntoObject (uid, reactiveObj, newValue) {
    const [parent, lastSection] = getParentNodeAndLastSection(uid, reactiveObj, { isRective: true })
    parent[lastSection] = newValue
    return newValue
}
export function removeValueFromObject (uid, obj) {
    const [parent, lastSection] = getParentNodeAndLastSection(uid, obj)
    delete parent[lastSection]
    return obj
}

export function deepReactiveMerge (target, source) {
    Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
            if (!existsFieldInObject(target, key)) {
                // eslint-disable-next-line no-param-reassign
                target[key] = reactive({})
            }
            deepReactiveMerge(target[key], source[key])
        } else {
            // eslint-disable-next-line no-param-reassign
            target[key] = source[key]
        }
    })
}
