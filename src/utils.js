/* eslint-disable import/prefer-default-export */

export function firstDefined (...vals) {
    return vals.find((v) => v !== undefined)
}
