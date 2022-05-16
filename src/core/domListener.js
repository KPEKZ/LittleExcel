import { capitalize } from 'core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No root provided for the Domlistener!');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = addPrefixToMethodName(listener);
            if (!this[method]) {
                throw new Error(`Method ${method} hasn't implementation in ${this.name} component`);
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method]);
        });
    }
    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = addPrefixToMethodName(listener);
            this.$root.remove(listener, this[method]);
        });
    }
}

function addPrefixToMethodName(eventName) {
    return 'on' + capitalize(String(eventName));
}
