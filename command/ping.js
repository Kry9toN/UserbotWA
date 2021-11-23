const { MessageType } = require('@adiwajshing/baileys')
const { processTime } = require('../util/time.js')

module.exports = {
    name: 'ping',
    description: 'Menampilkan rata-rata bot merespon',
    execute (wa) {
        wa.sendMessage(wa.from, `Pong!!\n${processTime(client.pingStart, moment())} _detik_`, MessageType.text)
        .catch(console.error)
    }
}