import { createContext } from "react"

const menuContext = createContext({
    menu: [],
    setMenu: (menu) => {}
});

export default menuContext;