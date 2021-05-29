import { v4 as uuidv4 } from 'uuid'

let listeners = []

export function addListener ({ onSetValue, onDeleteValue, onUpdateState }) {
    const uuid = uuidv4()
    listeners.push({
        uuid,
        onSetValue,
        onDeleteValue,
        onUpdateState,
    })
    return uuid
}

export function removeListener (uuid) {
    listeners = listeners.filter((listener) => listener.uuid !== uuid)
}

export function toEveryListener (action, ...args) {
    listeners.forEach((listener) => {
        listener[action]?.(...args)
    })
}
