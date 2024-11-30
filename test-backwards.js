const WordSearch = require('./src/index.js');

// Create multiple puzzles and count backwards words
const numPuzzles = 500; // Increased for better statistical significance
const gridSizes = [
    { cols: 15, rows: 15 },
    { cols: 20, rows: 20 },
    { cols: 25, rows: 25 }
];

const testWords = [
    'apple', 'banana', 'cherry', 'date', 'elderberry',
    'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
    'mango', 'orange', 'papaya', 'quince', 'raspberry'
];

for (const size of gridSizes) {
    let totalWords = 0;
    let totalBackwards = 0;
    
    console.log(`\nTesting grid size ${size.cols}x${size.rows}:`);
    
    for (let i = 0; i < numPuzzles; i++) {
        const puzzle = new WordSearch({
            dictionary: testWords,
            maxWords: 10,
            cols: size.cols,
            rows: size.rows,
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
}
