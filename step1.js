const fs = require('fs');

/**
 * Reads and prints the contents of a file
 * @param {string} path - The path to the file to read
 */
function cat(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    console.log(data);
  } catch (err) {
    console.error(`Error reading ${path}:`);
    console.error(`  ${err}`);
    process.exit(1);
  }
}

// Get command line argument
const path = process.argv[2];

if (!path) {
  console.error('Usage: node step1.js <file-path>');
  process.exit(1);
}

cat(path);
