const { createPathFromPair } = require("../src/utils.js");

const testCases = [
  // N
  {
    start: { x: 0, y: 2 },
    end: { x: 0, y: 0 },
    res: [{ x: 0, y: 2, dir: "N" }, { x: 0, y: 1, dir: "N" }, { x: 0, y: 0, dir: "N" }]
  },
  // S
  {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 2 },
    res: [{ x: 0, y: 0, dir: "S" }, { x: 0, y: 1, dir: "S" }, { x: 0, y: 2, dir: "S" }]
  },
  // E
  {
    start: { x: 0, y: 0 },
    end: { x: 2, y: 0 },
    res: [{ x: 0, y: 0, dir: "E" }, { x: 1, y: 0, dir: "E" }, { x: 2, y: 0, dir: "E" }]
  },
  // W
  {
    start: { x: 2, y: 0 },
    end: { x: 0, y: 0 },
    res: [{ x: 2, y: 0, dir: "W" }, { x: 1, y: 0, dir: "W" }, { x: 0, y: 0, dir: "W" }]
  },
  // NE
  {
    start: { x: 0, y: 2 },
    end: { x: 2, y: 0 },
    res: [{ x: 0, y: 2, dir: "NE" }, { x: 1, y: 1, dir: "NE" }, { x: 2, y: 0, dir: "NE" }]
  },
  // NW
  {
    start: { x: 2, y: 2 },
    end: { x: 0, y: 0 },
    res: [{ x: 2, y: 2, dir: "NW" }, { x: 1, y: 1, dir: "NW" }, { x: 0, y: 0, dir: "NW" }]
  },
  // SE
  {
    start: { x: 0, y: 0 },
    end: { x: 2, y: 2 },
    res: [{ x: 0, y: 0, dir: "SE" }, { x: 1, y: 1, dir: "SE" }, { x: 2, y: 2, dir: "SE" }]
  },
  // SW
  {
    start: { x: 2, y: 0 },
    end: { x: 0, y: 2 },
    res: [{ x: 2, y: 0, dir: "SW" }, { x: 1, y: 1, dir: "SW" }, { x: 0, y: 2, dir: "SW" }]
  },
  // Not a straight path
  {
    start: { x: 2, y: 0 },
    end: { x: 0, y: 3 },
    res: null
  }
];

describe("utils.createPathFromPair", () => {
  testCases.forEach(t => {
    it(`returns correct path (start: ${JSON.stringify(
      t.start
    )}, end: ${JSON.stringify(t.end)})`, () => {
      expect(createPathFromPair(t.start, t.end)).toEqual(t.res);
    });
  });
});
