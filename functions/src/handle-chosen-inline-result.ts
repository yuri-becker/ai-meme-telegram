import {ChosenInlineResult} from './telegram-bot-api'
import axios from 'axios'
import * as telegramApiUrl from './telegram-api-url'
import generateMeme from './generate-meme'

declare type InlineQueryResultType = {
  prefix: string,
  handler: ((chosen: ChosenInlineResult, unprefixedId: string) => void)
}
export const types: { [key: string]: InlineQueryResultType } = {
  chosenMeme: {
    prefix: 'chosenMeme:',
    handler: (chosen, memeId) => {
      generateMeme(memeId)
        .then(memeUrl =>
          axios.post(
            `${telegramApiUrl}/editMessageMedia`,
            {
              inline_message_id: chosen.inline_message_id,
              media: {type: 'photo', media: memeUrl}
            }
          ))
        .catch(reason => {
          console.log(reason)
          return axios.post(
            `${telegramApiUrl}/editMessageText`,
            {
              inline_message_id: chosen.inline_message_id,
              text: 'I\'m very sorry, but I seem to be broken. I already messaged my developer and asked her to fix me.'
            }
          )
        })
    }
  }
}

export default (chosenResult: ChosenInlineResult): void => {
  const type = Object.values(types).find(t => chosenResult.result_id.startsWith(t.prefix))
  if (!type) {
    console.warn(`Received a chosen inline result with unhandled id "${chosenResult.result_id}"`)
    return
  }
  type.handler(chosenResult, chosenResult.result_id.substring(type.prefix.length))
}

