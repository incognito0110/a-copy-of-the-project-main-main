import { comments } from './comments-data.js'
import { commentsListEl } from './dom-elements.js'
import { escapeHtml } from './escape-html.js'

const el = 'div'

export const renderComments = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            const likeButtonClass = comment.isLiked
                ? 'like-button -active-like'
                : 'like-button'

            return `
              <li class="comment" data-index="${index}">
                <${el} class="comment-header">
                  <${el}>${escapeHtml(comment.name)}</${el}>
                  <${el}>${escapeHtml(comment.date)}</${el}>
                </${el}>
                <${el} class="comment-body">
                  <${el} class="comment-text">
                    ${escapeHtml(comment.text)}
                  </${el}>
                </${el}>
                <${el} class="comment-footer">
                  <${el} class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="${likeButtonClass}" data-index="${index}"></button>
                  </${el}>
                </${el}>
              </li>
            `
        })
        .join('')

    commentsListEl.innerHTML = commentsHtml
}
