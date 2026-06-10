const API_URL =
    'https://wedev-api.sky.pro/api/v1/polugarov-vlad-unique/comments'

const toComment = (comment) => {
    return {
        id: comment.id,
        name: comment.author?.name || 'Пользователь',
        date: new Date(comment.date)
            .toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })
            .replace(',', ''),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
    }
}

export const getCommentsApi = () => {
    return fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки комментариев')
            }
            return response.json()
        })
        .then((data) => {
            const comments = data.comments.map(toComment)

            if (comments.length > 0) {
                comments[0].name = 'Влад Полугаров'
            }

            return comments
        })
}

export const addCommentApi = ({ name, text }) => {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            name,
            text,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка добавления комментария')
            }
            return fetch(API_URL)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки комментариев')
            }
            return response.json()
        })
        .then((data) => {
            const lastComment = data.comments[data.comments.length - 1]
            return toComment(lastComment)
        })
}
