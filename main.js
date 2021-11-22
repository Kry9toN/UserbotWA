const { WAConnection, MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')

async function automaticStatus() {
    const wa = new WAConnection()
    const storyMessage = 'Jam 3 yakah? testing tok \n\n\n story made automatic with bot'
    let storyId

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    if (fs.existsSync('./sessions-krypton.json')) {
        await wa.loadAuthInfo('./sessions-krypton.json')
        await wa.connect()
    } else {
        await wa.connect()
        await fs.writeFileSync('./sessions-krypton.json', JSON.stringify(wa.base64EncodedAuthInfo(), null, '\t'))
    }

    while(true) {
        const date = new Date()
        const time = date.getHours()
        await sleep(360000)
        if (time = 3) {
            const respon = await wa.sendMessage('status@broadcast', storyMessage, MessageType.text)
            if (statusId.length > 0) {
                await wa.deleteMessage('status@broadcast', {id: statusId, remoteJid: 'status@broadcast', fromMe: true})
            }
            statusId = respon.key.id
        }
    }

automaticStatus().catch(err => console.error('Unexpected error: ' + err))
