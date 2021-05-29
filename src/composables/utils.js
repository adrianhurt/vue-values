/* eslint-disable import/prefer-default-export */
import { existsFieldInObject } from '../utils'

export function firstDefined (defaultValue, obj, ...fieldNames) {
    let i = 0
    while (i < fieldNames.length) {
        if (existsFieldInObject(obj, fieldNames[i])) {
            return obj[fieldNames[i]]
        }
        i += 1
    }
    return defaultValue
}
