export function userName(val:any) {
    return /^[a-zA-Z0-9_-]{4,16}$/.test(val)
}