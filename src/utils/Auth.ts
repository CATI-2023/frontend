const STORAGE_KEY = "accessToken"

const isLogged = () => localStorage.getItem(STORAGE_KEY) !== null;
const login = (token: string) => {
    localStorage.setItem(STORAGE_KEY, token)
}
const logout = () => {localStorage.removeItem(STORAGE_KEY), window.location.reload()};

export { isLogged, login, logout }