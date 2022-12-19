export const isValidUrlSlug = (slug: string) => {
  const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g
  return regexExp.test(slug) // true
}
