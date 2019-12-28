//用户名正则校验
export const userName = (val:any) =>{
    return /^[a-zA-Z0-9_-]{4,16}$/.test(val)
}
//密码正则校验
export const passWord = (val:any) =>{
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val)
}
//手机号校验
export const phoneTest = (val:any)=>{
    return /^1[3456789]\d{9}$/.test(val)
}
//手机验证码校验
export const phoneTestCode = (val:any)=>{
    return /^\d{6}$/.test(val)
}