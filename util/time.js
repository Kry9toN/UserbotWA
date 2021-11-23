/**
 * Delay process
 * @param {Integer} ms
 */
exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Get Time duration
 * @param {Date} timestamp
 * @param {Date} now
 */
exports.processTime = (timestamp, now) => {
    // timestamp => timestamp when message was received
    return moment.duration(now - (timestamp * 1000)).asSeconds()
}