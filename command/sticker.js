const { MessageType } = require('@adiwajshing/baileys')
const { exec } = require('child_process')
const { getRandom } = require('../util/functions.js')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const { removeBackgroundFromImageFile } = require('remove.bg')

module.exports = {
    name: 'sticker',
    aliases: ['s', 'st'],
    description: 'Untuk menjadikan video atau gambar menjadi sticker\nPenggunaan: quoted gambar/vidio !sticker <rbg/nobg> rbg: remove background, nobg: no background on sticker, default sticker dengan background',
    async execute (wa, chat, pesan, args) {
        let durasi
        if (!durasi) {
            durasi = 0
        } else {
            durasi = chat.message.videoMessage.seconds
        }

        if ((wa.isMedia && !chat.message.videoMessage || wa.isQuotedImage) && args[0] == 'nobg') {
            const encmedia = wa.isQuotedImage ? JSON.parse(JSON.stringify(chat).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : await wa.fetchMessagesFromWA(chat.key.remoteJid, 1, { id: chat.key.id })
            let media
            if (wa.isQuotedImage) {
                media = await wa.downloadAndSaveMediaMessage(encmedia)
            } else {
                media = await wa.downloadAndSaveMediaMessage(encmedia[0])
            }
            const ranw = getRandom('.webp')
            wa.sendMessage(wa.from, pesan.tunggu, MessageType.text)
            await ffmpeg(`./${media}`)
                .input(media)
                .on('start', function (cmd) {
                    console.log(`[INFO] Started : ${cmd}`)
                })
                .on('error', function (err) {
                    console.log(`[INFO] Error : ${err}`)
                    fs.unlinkSync(media)
                    wa.sendMessage(wa.from, 'Error saat membuat sticker', MessageType.text)
                })
                .on('end', function () {
                    console.log('[INFO] Berhasil membuat sticker')
                    wa.sendMessage(wa.from, fs.readFileSync(ranw), MessageType.sticker)
                    fs.unlinkSync(media)
                    fs.unlinkSync(ranw)
                })
                .addOutputOptions(['-vcodec', 'libwebp', '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse'])
                .toFormat('webp')
                .save(ranw)
        } else if ((wa.isMedia && durasi < 11 && !durasi == 0 || wa.isQuotedVideo && chat.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
            const encmedia = wa.isQuotedImage ? JSON.parse(JSON.stringify(chat).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : await wa.fetchMessagesFromWA(chat.key.remoteJid, 1, { id: chat.key.id })
            let media
            if (wa.isQuotedImage) {
                media = await wa.downloadAndSaveMediaMessage(encmedia)
            } else {
                media = await wa.downloadAndSaveMediaMessage(encmedia[0])
            }
            const ranw = getRandom('.webp')
            wa.sendMessage(wa.from, pesan.tunggu, MessageType.text)
            await ffmpeg(`./${media}`)
                .inputFormat(media.split('.')[1])
                .on('start', function (cmd) {
                    console.log(`[INFO] Started : ${cmd}`)
                })
                .on('error', function (err) {
                    console.log(`[INFO] Error : ${err}`)
                    fs.unlinkSync(media)
                    const tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                    wa.sendMessage(wa.from, `❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`, MessageType.text)
                })
                .on('end', function () {
                    console.log('[INFO] Berhasil membuat sticker')
                    wa.sendMessage(wa.from, fs.readFileSync(ranw), MessageType.sticker)
                    fs.unlinkSync(media)
                    fs.unlinkSync(ranw)
                })
                .addOutputOptions(['-vcodec', 'libwebp', '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse'])
                .toFormat('webp')
                .save(ranw)
        } else if ((wa.isMedia || wa.isQuotedImage) && args[0] == 'rbg') {
            const encmedia = wa.isQuotedImage ? JSON.parse(JSON.stringify(chat).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : await wa.fetchMessagesFromWA(chat.key.remoteJid, 1, { id: chat.key.id })
            let media
            if (wa.isQuotedImage) {
                media = await wa.downloadAndSaveMediaMessage(encmedia)
            } else {
                media = await wa.downloadAndSaveMediaMessage(encmedia[0])
            }
            const ranw = getRandom('.webp')
            const ranp = getRandom('.png')
            wa.sendMessage(wa.from, pesan.tunggu, MessageType.text)
            const keyrmbg = process.env.KEY_REMOVEBG
            await removeBackgroundFromImageFile({ path: media, apiKey: `${keyrmbg}`, size: 'auto', type: 'auto', outputFile: ranp }).then((res) => {
                fs.unlinkSync(media)
                exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                    fs.unlinkSync(ranp)
                    if (err) return wa.sendMessage(wa.from, 'Error saat membuat sticker', MessageType.text)
                    wa.sendMessage(wa.from, fs.readFileSync(ranw), MessageType.sticker)
                })
            }).catch((err) => {
                return wa.sendMessage(wa.from, 'Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.', MessageType.text)
            })
        } else if ((wa.isMedia || wa.isQuotedImage) && args.length == 0) {
            const encmedia = wa.isQuotedImage ? JSON.parse(JSON.stringify(chat).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : await wa.fetchMessagesFromWA(chat.key.remoteJid, 1, { id: chat.key.id })
            let media
            if (wa.isQuotedImage) {
                media = await wa.downloadAndSaveMediaMessage(encmedia)
            } else {
                media = await wa.downloadAndSaveMediaMessage(encmedia[0])
            }
            const ranw = getRandom('.webp')
            await ffmpeg(`./${media}`)
                .on('start', function (cmd) {
                    console.log('[INFO] Started :', cmd)
                })
                .on('error', function (err) {
                    fs.unlinkSync(media)
                    console.log('[INFO] Error :', err)
                    wa.sendMessage(wa.from, 'Error saat membuat sticker', MessageType.text)
                })
                .on('end', function () {
                    console.log('[INFO] Berhasil membuat sticker')
                    wa.sendMessage(wa.from, fs.readFileSync(ranw), MessageType.sticker)
                    fs.unlinkSync(media)
                    fs.unlinkSync(ranw)
                })
                .addOutputOptions(['-vcodec', 'libwebp', '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=off [p]; [b][p] paletteuse'])
                .toFormat('webp')
                .save(ranw)
        } else {
            wa.sendMessage(wa.from, 'Kirim gambar dengan caption !sticker atau tag gambar yang sudah dikirim', MessageType.text)
        }
    }
}
