module.exports = {
    name: 'id',
    description: 'Menampilkan id user/group',
    execute (wa, chat, pesan) {
        const uid = wa.sender
        if (wa.isGroup) {
            const gid = wa.groupId
            wa.sendMessage(wa.from, `Id mu adalah: *${uid}*\nId group: *${gid}*`, MessageType.text)
        } else {
            wa.sendMessage(wa.from, `Id mu adalah: *${uid}*`, MessageType.text)
        }
    }
}
