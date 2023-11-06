export default {
    
    scenes: (function () {
      let n = new Map();
       n.set("n", {
        title:"n",
        render() { return "asef" },
        inputs: [{ label: "yes", exec() { stageHTML.value += "yes" } }, {
          label: "no",
          exec() { stageHTML.value += "no" }
        },{
          label: "go m",
          exec(c,e) { e.goto('m') }
        }]
      });
      n.set("m",{
        render(){return "damn"},
        inputs: [{ label: "go n", exec(c,e) {e.goto("n")  }}]})
      return n
    })()
  }