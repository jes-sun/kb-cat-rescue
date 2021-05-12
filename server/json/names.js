// Names from these Git repos. Note: Not all names from each list are included.
// https://github.com/sindresorhus/cat-names
// https://github.com/fregante/pet-names
// This script takes the array of strings and converts it to an array of objects.

const nameArray = require("./nameArray.json")
const fs = require("fs");
const { REPL_MODE_SLOPPY } = require("repl")

let newFileContent = "[ "

let newObj
nameArray.forEach(name => {
    newObj = "{ \"name\":\""+name+"\" },\n"
    newFileContent += newObj
})

newFileContent += "{ \"name\":\"Meow-Meow\" } ]"

console.log(newFileContent)

fs.writeFile("nameObjs.json", newFileContent, (err) => console.log(err))