import { initFormHandlers } from './handlers/form-handlers.js'
import { initLikeHandler } from './handlers/like-handler.js'
import { initQuoteHandler } from './handlers/quote-handler.js'
import { getCommentsApi } from './comments-api.js'
import { comments } from './comments-data.js'
import { renderComments } from './render-comments.js'

export const initApp = () => {
    initFormHandlers()
    initLikeHandler()
    initQuoteHandler()

    getCommentsApi()
        .then((loadedComments) => {
            comments.length = 0
            comments.push(...loadedComments)
            renderComments()
        })
        .catch((error) => {
            alert(error.message)
        })
}
