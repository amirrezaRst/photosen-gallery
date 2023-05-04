const { createContext } = require("react");


exports.pictureContext = createContext({
    pictures: [],
    setPictures: () => { },
})