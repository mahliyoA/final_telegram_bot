import { bot } from "../bot.js";

function onCourses(msg) {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, `Kurslar royhati..`)
}

export default onCourses