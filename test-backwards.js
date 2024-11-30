const WordSearch = require('./src/index.js');

// Create multiple puzzles and count backwards words
const numPuzzles = 100;
let totalWords = 0;
let totalBackwards = 0;

const testWords = [
    'apple', 'banana', 'cherry', 'date', 'elderberry',
    'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
    'mango', 'orange', 'papaya', 'quince', 'raspberry'
];

for (let i = 0; i < numPuzzles; i++) {
    const puzzle = new WordSearch({
        dictionary: testWords,
        maxWords: 10,
        cols: 15,
        rows: 15,
        backwardsProbability: 0.3
    });
    
    const words = puzzle.words;
    totalWords += words.length;
    totalBackwards += words.filter(w => w.backwards).length;
}

const backwardsPercentage = (totalBackwards / totalWords) * 100;
console.log(`Total words placed: ${totalWords}`);
console.log(`Total backwards words: ${totalBackwards}`);
console.log(`Backwards percentage: ${backwardsPercentage.toFixed(2)}%`);
