import { comments } from '../comments-data.js'
import { commentsListEl, textInputEl } from '../dom-elements.js'
import { setCommentValue } from '../form-state.js'

const handleQuoteClick = (event) => {
    const likeButtonEl = event.target.closest('.like-button')
    if (likeButtonEl) {
        return
    }

    const commentEl = event.target.closest('.comment')
    if (!commentEl) {
        return
    }

    const index = Number(commentEl.dataset.index)
    const comment = comments[index]
    if (!comment) {
        return
    }

    const quotedText = comment.text
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n')
    const quote = `> ${comment.name}:\n${quotedText}\n`
    const hasText = textInputEl.value.trim().length > 0
    textInputEl.value = hasText ? `${textInputEl.value}\n${quote}` : quote
    setCommentValue(textInputEl.value)
    textInputEl.focus()
}

export const initQuoteHandler = () => {
    commentsListEl.addEventListener('click', handleQuoteClick)
}
