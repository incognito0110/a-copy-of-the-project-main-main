import { comments } from '../comments-data.js'
import { commentsListEl } from '../dom-elements.js'
import { renderComments } from '../render-comments.js'

const handleLikeClick = (event) => {
    const likeButtonEl = event.target.closest('.like-button')
    if (!likeButtonEl) {
        return
    }

    const index = Number(likeButtonEl.dataset.index)
    const comment = comments[index]
    if (!comment) {
        return
    }

    comment.isLiked = !comment.isLiked
    comment.likes += comment.isLiked ? 1 : -1

    renderComments()
}

export const initLikeHandler = () => {
    commentsListEl.addEventListener('click', handleLikeClick)
}
