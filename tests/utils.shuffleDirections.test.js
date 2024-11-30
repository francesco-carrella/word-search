const { shuffleDirections } = require("../src/utils");

describe("shuffleDirections", () => {
    const backwardsDirections = ["N", "W", "NW", "SW"];
    const forwardDirections = ["S", "E", "NE", "SE"];
    const allDirections = [...backwardsDirections, ...forwardDirections];

    test("returns only forward directions when backwardsProbability is 0", () => {
        const result = shuffleDirections(allDirections, false, 0);
        expect(result.length).toBeGreaterThan(0);
        result.forEach(direction => {
            expect(forwardDirections).toContain(direction);
            expect(backwardsDirections).not.toContain(direction);
        });
    });

    test("returns all allowed directions when backwardsProbability is 1", () => {
        const result = shuffleDirections(allDirections, false, 1);
        expect(result.length).toBe(allDirections.length);
        result.forEach(direction => {
            expect(allDirections).toContain(direction);
        });
    });

    test("respects allowed directions when backwardsProbability is 0", () => {
        const allowedDirections = ["E", "S", "N", "W"]; // Only cardinal directions
        const result = shuffleDirections(allowedDirections, false, 0);
        expect(result).toEqual(expect.arrayContaining(["E", "S"]));
        expect(result).not.toEqual(expect.arrayContaining(["N", "W"]));
    });

    test("puts backwards directions first when tryBackwardsFirst is true", () => {
        const result = shuffleDirections(allDirections, true, 1);
        // Find the first non-backwards direction
        const firstForwardIndex = result.findIndex(d => forwardDirections.includes(d));
        // All directions before this index should be backwards
        const allBackwardsFirst = result
            .slice(0, firstForwardIndex)
            .every(d => backwardsDirections.includes(d));
        expect(allBackwardsFirst).toBe(true);
    });
});
