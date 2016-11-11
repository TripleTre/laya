export default {
    'onOverAdd' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputOver.add(value);
            return;
        } else {
            this.realObject.onInputOver.add(value);
        }
    },

    'onOverOnce' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputOver.addOnce(value);
            return;
        } else {
            this.realObject.onInputOver.addOnce(value);
        }
    },

    'onOutAdd' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputOut.add(value);
            return;
        } else {
            this.realObject.onInputOut.add(value);
        }
    },

    'onOutOnce' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputOut.addOnce(value);
            return;
        } else {
            this.realObject.onInputOut.addOnce(value);
        }
    },

    'onDownAdd' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputDown.add(value);
            return;
        } else {
            this.realObject.onInputDown.add(value);
        }
    },

    'onDownOnce' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputDown.addOnce(value);
            return;
        } else {
            this.realObject.onInputDown.addOnce(value);
        }
    },

    'onUpAdd' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputUp.add(value);
            return;
        } else {
            this.realObject.onInputUp.add(value);
        }
    },

    'onUpOnce' (value) {
        if (this.realObject.events) {
            this.realObject.events.onInputUp.addOnce(value);
            return;
        } else {
            this.realObject.onInputUp.addOnce(value);
        }
    },
};
