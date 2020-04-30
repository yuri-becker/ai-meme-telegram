import {Message} from './telegram-bot-api'
import axios from 'axios'
import * as telegramApiUrl from './telegram-api-url'

const sendIntroduction = (message: Message) => {
  const createBody = (text: string) => ({chat_id: message.chat.id, parse_mode: 'MarkdownV2', text: text})
  const endpoint = `${telegramApiUrl}/sendMessage`
  const sendMessage = (text: string) => () => axios.post(endpoint, createBody(text))

  // Ayyy
  sendMessage(`Hey there ${message.chat.first_name}\\! 👋`)()
    .then(sendMessage(`I am the AI Memes bot\\. 🤖
To summon me, simply type *@AiMemesBot* into any chat and select a meme you want captioned\\. You can try it out right now\\.`))
    .then(sendMessage(`Please note that I am not a very smart bot\\. 🤷‍♀️
In fact, all I do is call [imgflip's AI](https://imgflip.com/ai-meme) and tell them to create a meme for you\\. 
Me nor my developer are affiliated in any way with imgflip\\.
Therefore, it might or might not happen that they get tired of me and won't pick up my calls anymore\\. 😐`))
    .then(sendMessage(`Just by the way, my brain is open\\-source\\. Feel free to [take a peek](https://github.com/yuri-becker/ai-meme-telegram)\\!`))
    .then(sendMessage(`I hate to ask this of you 😖\\. But my developer, Yuri, pays a few bucks to keep me alive\\. So please consider [buying her a coffee as a thank\\-you](https://ko-fi.com/yuuuri)\\. 
She will be very grateful, I promise\\! 🙏`))
    .then(sendMessage('Either way or not, I hope you\'ll have a laugh or two from the memes I send you\\. Thanks for' +
      ' listening to me\\. 😊'))
    .catch(console.warn)
}

export default (message: Message): void => {
  if (message.text === '/start' && message.chat.type === 'private') sendIntroduction(message)
}
