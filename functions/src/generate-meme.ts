import {AjaxAiMemeResponse} from './imgflip-api'
import axios from 'axios'
import * as querystring from "querystring"
import * as config from './config.json'

const fetchMemeText = (memeId: string): Promise<AjaxAiMemeResponse> => {
  console.debug(`Requesting meme text from imgflip with id "${memeId}"...`)
  return axios.post(
    'https://imgflip.com/ajax_ai_meme',
    querystring.stringify({
      meme_id: memeId,
      init_text: '',
      __tok: config.imgflipToken
    }),
    {
      headers: {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'cookie': `iflipsess=${config.imgflipCookie}`
      }
    }
  )
    .then(response => {
      console.debug('Meme request successful')
      return response.data as AjaxAiMemeResponse
    })
}
const createImage = (memeId: string, text: AjaxAiMemeResponse): Promise<string> => {
  const transformText = (response: AjaxAiMemeResponse) => {
    const obj: { [index: string]: string } = {}
    response.texts.forEach((value, index) => obj[`boxes[${index}][text]`] = value)
    return obj
  }

  console.debug('Requesting image creation...')
  return axios.post(
    'https://api.imgflip.com/caption_image',
    querystring.stringify({
      template_id: memeId,
      username: config.imgflipUsername,
      password: config.imgflipPassword,
      ...transformText(text)
    })
  ).then((response) => {
    console.debug('Image request successful')
    return response.data.data.url
  })
}


export default (memeId: string): Promise<string> => {
  return fetchMemeText(memeId).then(memeText => createImage(memeId, memeText))
}
