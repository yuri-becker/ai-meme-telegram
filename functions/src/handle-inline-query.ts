import axios from 'axios'
import * as telegramApiUrl from './telegram-api-url'
import {AnswerInlineQueryBody, InlineQuery, InlineQueryResult, InlineQueryResultPhoto} from './telegram-bot-api'
import * as memes from './memes.json'
import {types as inlineResultTypes} from './handle-chosen-inline-result'

const fuzzifyMemeName = (name: string) => name.toLowerCase().replace(' ', '')

const suggestMemes = (query: InlineQuery): Promise<InlineQueryResult[]> => {
  return Promise.resolve(
    memes.memes
      .filter(meme => fuzzifyMemeName(meme.name).indexOf(fuzzifyMemeName(query.query)) !== -1)
      .map(meme => ({
        type: 'photo',
        id: `${inlineResultTypes.chosenMeme.prefix}${meme.id}`,
        caption: '_Generating Meme \\.\\.\\._',
        parse_mode: 'MarkdownV2',
        title: meme.name,
        photo_url: meme.image,
        thumb_url: meme.image,
        reply_markup: {
          // in order to get inline message feedback WITH the message id, we need to have a non-empty reply_markup
          inline_keyboard: [[{text: '...', callback_data: 'none'}]]
        }
      } as InlineQueryResultPhoto))
  )
}

const sendResult = (inline_query_id: string, results: InlineQueryResult[]): Promise<void> => {
  return axios.post(
    `${telegramApiUrl}/answerInlineQuery`,
    {
      inline_query_id: inline_query_id,
      results: results,
      is_personal: false,
      next_offset: ''
    } as AnswerInlineQueryBody
  )
}


export default (query: InlineQuery): void => {
  suggestMemes(query)
    .then(suggestedMemes => sendResult(query.id, suggestedMemes))
    .catch(err => {
      console.warn(`Could not answer inline-query with id "${query.id}" and queryText "${query.query}"`)
      console.warn(err)
    })
}
