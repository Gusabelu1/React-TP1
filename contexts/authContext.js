import { createContext } from "react"

const authContext = createContext({
    token: false,
    setToken: (token) => {}
});

export default authContext;