export interface User {
  id: number,
  is_bot: boolean,
  first_name: string,
  last_name?: string,
  username?: string,
  language_code?: string,
  can_join_groups?: boolean,
  can_read_all_group_messages?: boolean,
  supports_inline_queries?: boolean
}

export interface InlineQuery {
  id: string,
  from: User,
  location?: object
  query: string,
  offset: string
}

export declare type InlineQueryResult = InlineQueryResultPhoto

export interface InlineQueryResultPhoto {
  /**
   * Type of the result, must be photo
   */
  type: 'photo'
  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string
  /**
   * A valid URL of the photo. Photo must be in jpeg format. Photo size must not exceed 5MB
   */
  photo_url: string
  /**
   * URL of the thumbnail for the photo
   */
  thumb_url: string
  /**
   * Width of the photo
   */
  photo_width?: number
  /**
   * Height of the photo
   */
  photo_height?: number
  /**
   * Title for the result
   */
  title?: string
  /**
   * Short description of the result
   */
  description?: string
  /**
   * Caption of the photo to be sent, 0-1024 characters after entities parsing
   */
  caption?: string
  /**
   * Mode for parsing entities in the photo caption. See formatting options for more details.
   */
  parse_mode?: string
  /**
   * Inline keyboard attached to the message
   */
  reply_markup?: InlineKeyboardMarkup

  /**
   * Content of the message to be sent instead of the photo
   */
  input_message_content?: object
}

export declare type InlineKeyboardMarkup = { inline_keyboard: InlineKeyboardButton[][] }

interface InlineKeyboardButton {
  /**
   * Label text on the button
   */
  text: string
  /**
   * HTTP or tg:// url to be opened when button is pressed
   */
  url?: string
  /**
   * An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget.
   */
  login_url?: object

  /**
   * Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
   */
  callback_data?: string

  /**
   * If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the
   *  bot‘s username and the specified inline query in the input field. Can be empty, in which case just the bot’s
   *  username will be inserted.
   *
   * Note: This offers an easy way for users to start using your bot in inline mode when they are currently in a
   * private chat with it. Especially useful when combined with switch_pm… actions – in this case the user will be
   * automatically returned to the chat they switched from, skipping the chat selection screen.
   */
  switch_inline_query?: string

  /**
   * If set, pressing the button will insert the bot‘s username and the specified inline query in the current chat’s
   * input field. Can be empty, in which case only the bot's username will be inserted.

   * This offers a quick way for the user to open your bot in inline mode in the same chat – good for selecting
   * something from multiple options.
   */
  switch_inline_query_current_chat?: string

  /**
   * Description of the game that will be launched when the user presses the button.
   *
   * NOTE: This type of button must always be the first button in the first row.
   */
  callback_game?: object

  /**
   *  Specify True, to send a Pay button.
   *
   * NOTE: This type of button must always be the first button in the first row.
   */
  pay?: boolean
}

interface AnswerInlineQueryBody {
  /**
   * Unique identifier for the answered query
   */
  inline_query_id: string

  /**
   * A JSON-serialized array of results for the inline query
   */
  results: InlineQueryResult[]

  /**
   * The maximum amount of time in seconds that the result of the inline query may be cached on the server.
   * Defaults to 300.
   */
  cache_time?: number
  /**
   * Pass True, if results may be cached on the server side only for the user that sent the query. By default, results
   * may be returned to any user who sends the same query
   */
  is_personal?: boolean

  /**
   * Pass the offset that a client should send in the next query with the same text to receive more results. Pass an
   * empty string if there are no more results or if you don‘t support pagination. Offset length can’t exceed 64 bytes.
   */
  next_offset?: string
  /**
   * If passed, clients will display a button with specified text that switches the user to a private chat with the bot
   * and sends the bot a start message with the parameter switch_pm_parameter
   */
  switch_pm_text?: string
  /**
   * Deep-linking parameter for the /start message sent to the bot when user presses the switch button. 1-64
   * characters, only A-Z, a-z, 0-9, _ and - are allowed.
   *
   * Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to
   * adapt search results accordingly. To do this, it displays a ‘Connect your YouTube account’ button above the
   * results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in
   * doing so, passes a start parameter that instructs the bot to return an oauth link. Once done, the bot can offer a
   * switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline
   * capabilities.
   */
  switch_pm_parameter?: string
}

export interface ChosenInlineResult {
  from: User
  inline_message_id: string
  query: string
  result_id: string
}

export interface Message {
  message_id: number
  from: User
  chat: {
    id: number
    first_name: string
    last_name: string
    username: string
    type: 'private' | 'group' | 'supergroup' | 'channel'
  },
  date: number,
  text: string
}
