const { createContext } = require("react");

exports.userContext = createContext({
    userData: {},
    setUserData: () => { },
    userLogin: false,
    setUserLogin: () => { }
})