const { MessageType } = require('@adiwajshing/baileys')
const { sleep } = require('../util/time.js')

module.exports = {
    name: 'status',
    description: 'Mengbah status/bio profil',
    execute (wa, chat, pesan, args) {
        const num = parseInt(args[0])
        for(let i = 0; i < num; i++) {
            wa.sendMessage(wa.from, args[1], MessageType.text)
            .catch(console.error)
            sleep(1000)
        }
    }
}
