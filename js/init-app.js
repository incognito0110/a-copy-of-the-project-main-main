import { initFormHandlers } from './handlers/form-handlers.js'
import { initLikeHandler } from './handlers/like-handler.js'
import { initQuoteHandler } from './handlers/quote-handler.js'
import { renderComments } from './render-comments.js'

export const initApp = () => {
    initFormHandlers()
    initLikeHandler()
    initQuoteHandler()
    renderComments()
}
