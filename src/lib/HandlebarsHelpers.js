

export default {
  link(url, options) {
    return `<a href="${url}" class="sidebar__link">${options.fn(this)}</a>`;
  },

  ifEquals(arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  },
};
