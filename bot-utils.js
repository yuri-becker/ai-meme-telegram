const axios = require('axios')
const telegramApiUrl = require('./functions/src/telegram-api-url')
const config = require('./functions/src/config.json')
const yargs = require('yargs')
const telegramWebhookPath = require('./functions/src/telegram-webhook-path')

const registerWebhook = (argv) => {
  axios.post(
    `${telegramApiUrl}/setWebhook`,
    {url: `${argv.selfUrl}/${telegramWebhookPath}`}
  )
    .then(value => {
      console.info('Successfully registered webhook.')
      console.debug(value.data)
      process.exit(0)
    })
    .catch(err => {
      console.error('Could not register web')
      console.error(err)
      process.exit(1)
    })
}

const webhookInfo = () => {
  axios.get(
    `${telegramApiUrl}/getWebhookInfo`
  )
    .then(value => {
      console.info('Retrieved webhook info:')
      console.info(value.data)
      process.exit(0)
    })
    .catch(err => {
      console.error('Could not retrieve webhook info')
      console.error(err)
      process.exit(1)
    })
}

const args = yargs
  .command(
    'registerWebhook',
    'Sets this application as the bot\'s webhook, using the property "selfUrl" in functions/src/config.json or with --selfUrl.',
    yargs => yargs.positional('selfUrl', {type: 'string', demandOption: true, default: config.selfUrl}),
    registerWebhook
  )
  .command(
    'webhookInfo',
    'Retrives webhook info.',
    yargs => yargs,
    webhookInfo
  )
  .recommendCommands()
  .version(false)
  .demandCommand()
  .help()
  .argv
