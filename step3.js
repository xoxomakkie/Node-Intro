const fs = require('fs');
const axios = require('axios');

/**
 * Reads the contents of a file
 * @param {string} path - The path to the file to read
 * @returns {Promise<string>} The file contents
 */
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error(`Error reading ${path}:\n  ${err}`));
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Fetches the contents of a URL
 * @param {string} url - The URL to fetch
 * @returns {Promise<string>} The response data
 */
async function fetchUrl(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching ${url}:\n  ${err}`);
  }
}

/**
 * Writes content to a file
 * @param {string} filename - The file to write to
 * @param {string} content - The content to write
 */
function writeFile(filename, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, 'utf8', (err) => {
      if (err) {
        reject(new Error(`Couldn't write ${filename}:\n  ${err}`));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Outputs content either to console or to a file
 * @param {string} content - The content to output
 * @param {string|null} outputFile - The file to write to, or null for console
 */
async function output(content, outputFile) {
  if (outputFile) {
    await writeFile(outputFile, content);
  } else {
    console.log(content);
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

/**
 * Gets content from either a file or URL
 * @param {string} input - The file path or URL
 * @returns {Promise<string>} The content
 */
async function getContent(input) {
  if (isUrl(input)) {
    return await fetchUrl(input);
  } else {
    return await readFile(input);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  let outputFile = null;
  let input = null;

  // Parse command line arguments
  if (args.length === 0) {
    console.error('Usage: node step3.js [--out output-file] <file-path-or-url>');
    process.exit(1);
  }

  if (args[0] === '--out') {
    if (args.length < 3) {
      console.error('Usage: node step3.js [--out output-file] <file-path-or-url>');
      process.exit(1);
    }
    outputFile = args[1];
    input = args[2];
  } else {
    input = args[0];
  }

  try {
    const content = await getContent(input);
    await output(content, outputFile);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();
