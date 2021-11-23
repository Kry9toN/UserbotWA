const { MessageType } = require('@adiwajshing/baileys')

module.exports = {
    name: 'status',
    description: 'Mengbah status/bio profil',
    execute (wa, args) {
        wa.setStatus(args[0])
        .catch(console.error)
    }
}