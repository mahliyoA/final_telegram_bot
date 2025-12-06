import { bot } from "../bot.js";

function onError(msg) {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, `xatolik... /start bosing!`)
}

export default onError