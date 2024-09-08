export function setCookie(cName: string, cValue: string, exDays: number) {
  const d = new Date()
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cName}=${cValue};${expires};path=/;SameSite=Strict`
}

export function getCookie(cName: string) {
  const name = `${cName}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function deleteCookie(cName: string) {
  setCookie(cName, '', -1)
}
