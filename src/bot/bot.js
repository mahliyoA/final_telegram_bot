import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import onStart from "./handlers/onStart.js";
import onProfile from "./handlers/onProfile.js";
import onError from "./handlers/onError.js";
import onCourses from "./handlers/onCourses.js";
import onLocation from "./handlers/onlacation.js";

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const CHANNEL_ID = "@bektrdiyeva";
// check if user is subscribed to channel
const checkIfUserSubscribed = async (chatId) => {
  try {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);
    console.log(chatMember.status);

    if (chatMember.status == "left" || chatMember.status == "kicked") {
      return false;
    } else {
      return true;
    }
  } catch {
    console.log("error: chatMember checking");
  }
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;



  const user_subscribed = await checkIfUserSubscribed(chatId);

  console.log(user_subscribed);

  if (user_subscribed == false) {
    return bot.sendMessage(
      chatId,
      `Hurmatli ${firstname}, \nSiz botimizdan foydalanishingiz uchun oldin quyidagi kanalga obuna bo'lishing garak... 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Soliyajon Bekturdiyeva`,
                url: "https://t.me/bektrdiyeva",
              },
            ],
            [
              {
                text: `Obunani tekshirish ✅`,
                callback_data: "confirm_subscribtion",
              },
            ],
          ],
        },
      }
    );
  }

  if (text == "/start") {
        return onStart(msg);
    } else if (text == "/profile") {
        return onProfile(msg);
    } else if (text == "📚 Kurslar") {
        return onCourses(msg)
    }else if (text == "ℹ️ Markaz haqida"){
        return onLocation(msg);
    }else if (text == "ℹ️ Markaz haqida"){
      return onLocation(msg)
    }

    return onError(msg);
});

bot.on("callback_query", async (query) => {
    const msg = query.message;
    const data = query.data;
    const queryId = query.id;

    const chatId = msg.chat.id;
    const firstname = msg.chat.first_name;

    if (data == "confirm_subscribtion") {
        console.log("TUGMA BOSILDIII");
        const user_subscribed = await checkIfUserSubscribed(chatId);

        if (user_subscribed == false) {
            return bot.answerCallbackQuery(queryId, {
                text: "Siz hali obuna bo'lmadingiz... ❌",
            });
        } else {
            bot.deleteMessage(chatId, msg.message_id);
            return onStart(msg);
        }
    }
    if (data == "course_english") {
        bot.sendMessage(chatId, `
     🇬🇧 Ingliz tili kursi haqida:

📆 Davomiyligi: 3 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 350 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.
 `,

        );
    } else if (data == "course_russian") {
        bot.sendMessage(chatId,
            ` 🇬🇧 Rustili tili kursi haqida:

📆 Davomiyligi: 3 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 350 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.
            `)
    } else if (data == "course_math"){
        bot.sendMessage(chatId,
            `🇬🇧 Matematika kursi haqida:

📆 Davomiyligi: 3 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 350 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.`
        )
    }else if (data=="course_programming"){
        bot.sendMessage(chatId,
            `🇬🇧 Dasturlash kursi haqida:
            📆 Davomiyligi: 3 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 350 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing bizning...`
        )
    }
    

});

console.log("Bot ishga tushdi...");

// export { bot };