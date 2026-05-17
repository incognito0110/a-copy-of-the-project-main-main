import { comments } from '../comments-data.js'
import { escapeHtml } from '../escape-html.js'
import { addFormButtonEl, nameInputEl, textInputEl } from '../dom-elements.js'
import {
    commentValue,
    nameValue,
    setCommentValue,
    setNameValue,
} from '../form-state.js'
import { renderComments } from '../render-comments.js'

export const initFormHandlers = () => {
    nameInputEl.addEventListener('input', () => {
        setNameValue(nameInputEl.value)
        nameInputEl.classList.remove('-invalid')
    })

    textInputEl.addEventListener('input', () => {
        setCommentValue(textInputEl.value)
        textInputEl.classList.remove('-invalid')
    })

    addFormButtonEl.addEventListener('click', () => {
        const trimmedName = nameValue.trim()
        const trimmedComment = commentValue.trim()

        nameInputEl.classList.remove('-invalid')
        textInputEl.classList.remove('-invalid')

        if (!trimmedName || !trimmedComment) {
            if (!trimmedName) nameInputEl.classList.add('-invalid')
            if (!trimmedComment) textInputEl.classList.add('-invalid')
            return
        }

        const now = new Date()
            .toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })
            .replace(',', '')

        comments.push({
            name: escapeHtml(trimmedName),
            date: now,
            text: escapeHtml(trimmedComment),
            likes: 0,
            isLiked: false,
        })

        renderComments()

        setNameValue('')
        setCommentValue('')
        nameInputEl.value = ''
        textInputEl.value = ''
    })
}
