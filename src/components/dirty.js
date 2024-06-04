const allset={
    city:{label:"city"}
}
export default  Object.assign(Object.create(allset),{
    label: "DefaultSet",
    options: ["defaultop1","city"],
    min:3,max:7,
    defaultop1:{label:"dop1"},
    defaultop2:{label:"dop2"},
    g1:{label:"city"},
    groups:[
        {chance:1,required:["g1"],
            label:"exp_group",
            g1:[{label:"groupyes"}]
        },
        {chance:1,required:["g1"],
            label:"exp_group2",
            g1:[{label:"groupyes"}]
        },
    ]
});