import { cjn } from "./index.js"
//node ./src/util/test.js
console.log(cjn(
    {
        b: {
            a: "Doom", "&ref": "peace","&let":"b",
            d:{"&ref":"b"}
        },
        c:{
            check:32,"&ref":"b"
        }
    }
    , { refs: { "peace": { where: "in neverland" } } }))