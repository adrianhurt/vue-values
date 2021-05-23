/* eslint-disable import/prefer-default-export */

export function existsFieldInObject (obj, fieldName) {
    return Object.prototype.hasOwnProperty.call(obj, fieldName)
}
