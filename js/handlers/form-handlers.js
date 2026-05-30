import { addCommentApi } from '../comments-api.js'
import { comments } from '../comments-data.js'
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

        addCommentApi({
            name: trimmedName,
            text: trimmedComment,
        })
            .then((newComment) => {
                comments.push(newComment)
                renderComments()

                setNameValue('')
                setCommentValue('')
                nameInputEl.value = ''
                textInputEl.value = ''
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}
