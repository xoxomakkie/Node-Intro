const fs = require('fs');
const axios = require('axios');

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

/**
 * Fetches and prints the contents of a URL
 * @param {string} url - The URL to fetch
 */
async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:`);
    console.error(`  ${err}`);
    process.exit(1);
  }
}

/**
 * Determines if a string is a URL
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a URL
 */
function isUrl(str) {
  return str.startsWith('http://') || str.startsWith('https://');
}

// Main execution
async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error('Usage: node step2.js <file-path-or-url>');
    process.exit(1);
  }

  if (isUrl(input)) {
    await webCat(input);
  } else {
    cat(input);
  }
}

main();
