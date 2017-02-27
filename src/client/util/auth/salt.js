import btoa from 'btoa'

export default seed => {
  let bytes = []
  for (let i = 0, l = seed.length; i < l; i++) {
    bytes.push(seed.charCodeAt(i))
  }

  while (bytes.length < 16) {
    bytes.push(0)
  }

  // convert byte array to base64 string
  let salt = btoa(String.fromCharCode.apply(String, bytes.slice(0, 16)))

  // header for bcrypt that will fake 10 rounds.
  return `$2a$10$${salt}`
}
