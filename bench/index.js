const { Suite } = require("benchmark")
const cx = require("classnames")
const cc = require("../")

require("./fixtures").map((fixed, index, { length }) => {
  const suite = new Suite()
  suite
    .add(`Classcat – ${fixed.description}`, () => cc(fixed.args))
    .add(`classNames – ${fixed.description}`, () => cx.apply({}, fixed.args))
    .on("cycle", ({ target: { name, hz, stats } }) =>
      console.log(`${name} × ${Math.floor(hz).toLocaleString()} ops/sec`)
    )
    .on("complete", function() {
      console.log(
        `Fastest is ${this.filter("fastest").map("name")}${
          index + 1 < length ? "\n" : ""
        }`
      )
    })
    .run()
})
