const { MessageType } = require('@adiwajshing/baileys')
const { sleep } = require('../util/time.js')

module.exports = {
    name: 'spam',
    aliases: ['sp'],
    description: 'Spam pesan ke target !spam <jumlah>|<pesan>',
    execute (wa, chat, pesan, args) {
        const arg = wa.body.slice(5)
        const num = parseInt(arg.split('|')[0].trim())
        for(let i = 0; i < num; i++) {
            wa.sendMessage(wa.from, arg.split('|')[1], MessageType.text)
            .catch(console.error)
            sleep(1000)
        }
    }
}
