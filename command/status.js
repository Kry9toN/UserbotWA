const { MessageType } = require('@adiwajshing/baileys')

module.exports = {
    name: 'status',
    description: 'Mengbah status/bio profil',
    execute (wa, chat, pesan, args) {
        const string = args.slice().join(' ')
        wa.setStatus(string)
        .then(wa.sendMessage(wa.from, 'Telah berhasil mengubah Bio', MessageType.text))
        .catch(console.error)
    }
}
