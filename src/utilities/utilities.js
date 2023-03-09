export function randomUniqKey() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}

export function objectIsEmpty(object) {
    return Object.keys(object).length === 0
}