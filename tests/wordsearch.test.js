const WordSearch = require("../src/index.js");

describe("WordSearch", () => {
  const ws1 = new WordSearch();
  const ws2 = new WordSearch({
    cols: 10,
    rows: 10,
    disabledDirections: [],
    allowedDirections: ["N", "S", "E", "W", "NE", "NW", "SE", "SW"],
    dictionary: ["Hello", "world"],
    maxWords: 20,
    upperCase: true,
    diacritics: false
  });

  it(`creates an instance with default settings`, () => {
    expect(ws1.settings).toEqual(ws1.defaultSettings);
  });

  it(`does not exceed maxWords in grid`, () => {
    const ws3 = new WordSearch({
      dictionary: ["Hello", "world"],
      maxWords: 1
    });
    expect(ws3.words).toHaveLength(1);
  });

  it(`does not try to insert words that are too long`, () => {
    const ws4 = new WordSearch({
      dictionary: ["Hello", "AVeryLongName"]
    });
    expect(ws4.words).toHaveLength(1);
  });

  it(`ws.grid returns a grid with the correct cell count`, () => {
    expect(ws1.grid.map(l => l.join("")).join("")).toHaveLength(
      ws1.defaultSettings.cols * ws1.defaultSettings.rows
    );
  });

  it(`ws.words returns a list of words with the correct length`, () => {
    expect(ws2.words).toHaveLength(2);
  });

  it(`ws.utils returns an object`, () => {
    expect(typeof ws2.utils).toBe("object");
  });

  it(`ws.dump() returns an object providing instance info`, () => {
    const dump = ws2.dump();
    expect(typeof dump).toBe("object");
    expect(typeof dump.settings).toBe("object");
    expect(typeof dump.data).toBe("object");
    expect(dump.data.grid).toHaveLength(ws2.settings.rows);
    expect(dump.data.words).toHaveLength(2);
  });

  it(`ws.load() correctly applies the given properties`, () => {
    const options = {
      settings: {
        cols: 10,
        rows: 10,
        disabledDirections: [],
        allowedDirections: ["N", "S", "E", "W", "NE", "NW", "SE", "SW"],
        dictionary: ["Hello", "world"],
        maxWords: 4,
        upperCase: true,
        diacritics: false
      },
      data: {
        grid: [
          ["H", "O", "G", "N", "I", "A", "Q", "R", "S", "D"],
          ["L", "M", "F", "N", "T", "N", "F", "N", "L", "U"],
          ["T", "J", "P", "R", "P", "E", "V", "R", "M", "E"],
          ["Y", "T", "R", "R", "Y", "K", "O", "F", "B", "D"],
          ["B", "G", "G", "R", "P", "W", "V", "M", "G", "N"],
          ["Y", "J", "V", "U", "G", "S", "G", "H", "X", "V"],
          ["E", "A", "O", "O", "L", "L", "E", "H", "W", "C"],
          ["F", "A", "L", "B", "V", "V", "V", "K", "V", "P"],
          ["T", "X", "R", "S", "F", "N", "J", "R", "H", "S"],
          ["D", "T", "E", "G", "E", "S", "H", "O", "M", "A"]
        ],
        words: [
          {
            word: "Hello",
            clean: "HELLO",
            path: [
              { x: 7, y: 6 },
              { x: 6, y: 6 },
              { x: 5, y: 6 },
              { x: 4, y: 6 },
              { x: 3, y: 6 }
            ]
          },
          {
            word: "world",
            clean: "WORLD",
            path: [
              { x: 5, y: 4 },
              { x: 6, y: 3 },
              { x: 7, y: 2 },
              { x: 8, y: 1 },
              { x: 9, y: 0 }
            ]
          }
        ]
      }
    };
    ws2.load(options);
    expect(ws2.grid).toEqual(options.data.grid);
    expect(ws2.settings).toEqual(options.settings);
  });

  it(`ws.read() returns the correct string`, () => {
    expect(ws2.read({ x: 7, y: 6 }, { x: 3, y: 6 })).toEqual("HELLO");
    expect(ws2.read({ x: 7, y: 6 }, { x: 3, y: 9 })).toEqual(null);
  });

  it(`ws.toString() returns the grid as a string`, () => {
    expect(typeof ws1.toString()).toBe("string");
  });
});