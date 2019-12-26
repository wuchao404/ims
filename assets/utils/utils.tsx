export function userName(val:any) {
    return /^[a-zA-Z0-9_-]{4,16}$/.test(val)
}
export function passWord(val:any) {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val)
}