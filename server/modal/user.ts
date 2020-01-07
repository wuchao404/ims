export interface User {
  username: string,
  password: string,
  userId: string,
  name: string,
  birthday: string,
  address: string,
  mobilePhone: string
}
// 包含jwt内部字段
export interface DecodeUser extends User {
  iat?: number,// issued at (time)发布时间
  jti?: string,// JWT ID
  nbf: number, // not before (time) 在此之前无效
  exp?: number, // expiration (time) 过期时间
  iss?: string, // issuer 发布人
  aud?: string, // audience 用户
  sub?: string // subject 主题
}

