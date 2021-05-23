import { existsFieldInObject } from '../utils'

export function isObject (obj) {
    return typeof obj === 'object' && obj !== null
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

function getParentNodeAndLastSection (uid, obj) {
    const sections = uid.split('.')
    let node = obj
    for (let i = 0; i < sections.length - 1; i += 1) {
        if (!existsFieldInObject(node, sections[i])) {
            node[sections[i]] = {}
        }
        node = node[sections[i]]
    }
    return [node, sections[sections.length - 1]]
}

export function getValueFromObject (uid, obj, { defaultValue = undefined } = {}) {
    const [parent, lastSection] = getParentNodeAndLastSection(uid, obj)
    if (!existsFieldInObject(parent, lastSection)) {
        parent[lastSection] = defaultValue
    }
    return parent[lastSection]
}
export function setValueIntoObject (uid, obj, newValue) {
    const [parent, lastSection] = getParentNodeAndLastSection(uid, obj)
    parent[lastSection] = newValue
    return newValue
}
export function removeValueFromObject (uid, obj) {
    const [parent, lastSection] = getParentNodeAndLastSection(uid, obj)
    delete parent[lastSection]
    return obj
}

export function deepMerge (target, source) {
    Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
            if (!existsFieldInObject(target, key)) {
                // eslint-disable-next-line no-param-reassign
                target[key] = {}
            }
            deepMerge(target[key], source[key])
        } else {
            // eslint-disable-next-line no-param-reassign
            target[key] = source[key]
        }
    })
}
