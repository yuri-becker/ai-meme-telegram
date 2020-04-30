import * as functions from 'firebase-functions'
import * as telegramWebhookPath from './telegram-webhook-path'
import handleInlineQuery from './handle-inline-query'
import handleChosenInlineResult from './handle-chosen-inline-result'
import handleMessage from './handle-message'
import {ChosenInlineResult, InlineQuery, Message} from './telegram-bot-api'

const telegramHook = functions.https.onRequest((req, res) => {
  res.send()

  if (req.body.inline_query) {
    handleInlineQuery(req.body.inline_query as InlineQuery)
  } else if (req.body.chosen_inline_result) {
    handleChosenInlineResult(req.body.chosen_inline_result as ChosenInlineResult)
  } else if (req.body.message) {
    handleMessage(req.body.message as Message)
  } else {
    console.warn('Unhandled update on the telegram hook:')
    console.warn(req.body)
  }

})

export = {
  [telegramWebhookPath]: telegramHook
}
