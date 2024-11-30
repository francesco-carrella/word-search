const { createPath } = require("../src/utils.js");

const testCases = [
  {
    x: 0,
    y: 0,
    dir: "S",
    len: 2,
    res: [{ x: 0, y: 0, dir: "S" }, { x: 0, y: 1, dir: "S" }]
  },
  {
    x: 0,
    y: 6,
    dir: "N",
    len: 2,
    res: [{ x: 0, y: 6, dir: "N" }, { x: 0, y: 5, dir: "N" }]
  },
  {
    x: 0,
    y: 6,
    dir: "E",
    len: 2,
    res: [{ x: 0, y: 6, dir: "E" }, { x: 1, y: 6, dir: "E" }]
  },
  {
    x: 6,
    y: 6,
    dir: "W",
    len: 2,
    res: [{ x: 6, y: 6, dir: "W" }, { x: 5, y: 6, dir: "W" }]
  },
  {
    x: 6,
    y: 6,
    dir: "SW",
    len: 2,
    res: [{ x: 6, y: 6, dir: "SW" }, { x: 5, y: 7, dir: "SW" }]
  }
];

describe("utils.createPath", () => {
  testCases.forEach(t => {
    it(`returns correct path (x: ${t.x}, y: ${t.y}, dir: "${t.dir}", len: ${
      t.len
    })`, () => {
      expect(createPath(t.x, t.y, t.dir, t.len)).toEqual(t.res);
    });
  });
});
