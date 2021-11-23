const { MessageType } = require('@adiwajshing/baileys')

module.exports = {
    name: 'status',
    description: 'Mengbah status/bio profil',
    execute (wa, args) {
        const string = args.slice().join(' ')
        wa.setStatus(string)
        .then(wa.sendMessage(wa.from, text, MessageType.text))
        .catch(console.error)
    }
}
