const chalk = require('chalk')

/**
 * Generate random name
 * @param {String} ext
 */
exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

/**
 * Give color on text
 * @param {String} text
 * @param {String} color
 */
exports.color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}