class Dom {
    constructor(selector) {
        this.$elmnt = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$elmnt.innerHTML = html;
            return this;
        }

        return this.$elmnt.outerHTML.trim();
    }

    clear() {
        this.html('');
        return this;
    }

    on(eventType, callback) {
        this.$elmnt.addEventListener(eventType, callback);
    }

    remove(eventType, fn) {
        this.$elmnt.removeEventListener(eventType, fn);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$elmnt;
        }
        if (Element.prototype.append) {
            this.$elmnt.append(node);
        } else {
            this.$elmnt.appendChild(node);
        }

        return this;
    }

    closest(selector) {
        return $(this.$elmnt.closest(selector));
    }

    getCoords() {
        return this.$elmnt.getBoundingClientRect();
    }

    get data() {
        return this.$elmnt.dataset;
    }

    findAll(selector) {
        return this.$elmnt.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object.keys(styles).forEach((key) => {
            this.$elmnt.style[key] = styles[key];
        });
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const elmnt = document.createElement(tagName);
    if (classes) {
        elmnt.classList.add(classes);
    }
    return $(elmnt);
};
