import Cookies from 'js-cookie'

const TokenKey = 'X-Token'
// const RolesKey = 'XR-Roles'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// export function getRoles() {
//   return Cookies.get(RolesKey)
// }

// export function setRoles(roles) {
//   return Cookies.set(RolesKey, roles)
// }

// export function removeRoles() {
//   return Cookies.remove(RolesKey)
// }
