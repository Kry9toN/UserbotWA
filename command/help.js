const { MessageType } = require('@adiwajshing/baileys')

module.exports = {
    name: 'help',
    aliases: ['h'],
    cooldown: 10,
    description: 'Menampilkan semua perintah',
    execute (wa, chat, pesan, args) {
        const commands = wa.cmd
        if (args.length == 0) {
            let text = 'Daftar perintah\n'
            commands.forEach((cmd) => {
                text += `- *${cmd.name}* ${cmd.aliases ? `(${cmd.aliases})` : ''}\n`
            })
            text += 'ketik *!help <perintah>* akan menampilkan penggunaan perintah tersebut'
            return wa.sendMessage(wa.from, text, MessageType.text)
        } else {
            if (!wa.cmd.has(args[0])) return wa.sendMessage(wa.from, 'Perintah yang anda maksut tidak ada', MessageType.text)
            const text = wa.cmd.get(args[0]).description
            return wa.sendMessage(wa.from, text, MessageType.text)
        }
    }
}