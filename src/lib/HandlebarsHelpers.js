export default {
    link: function(url, options) {
        return `<a href="${url}" class="sidebar__link">${options.fn(this)}</a>`
    },
}