const STORAGE_KEY = "como decriptar uma string com sha256 reactTS"

const isLogged = () => sessionStorage.getItem(STORAGE_KEY) !== null;
const login = (token: string) => {
    sessionStorage.setItem(STORAGE_KEY, token)
}
const logout = () => {sessionStorage.removeItem(STORAGE_KEY), window.location.reload()};

export { isLogged, login, logout }