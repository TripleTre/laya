export default {
    'onOverAdd' (value) {
        this.realObject.onInputOver.add(value);
    },

    'onOverOnce' (value) {
        this.realObject.onInputOver.addOnce(value);
    },

    'onOutAdd' (value) {
        this.realObject.onInputOut.add(value);
    },

    'onOutOnce' (value) {
        this.realObject.onInputOut.addOnce(value);
    },

    'onDownAdd' (value) {
        this.realObject.onInputDown.add(value);
    },

    'onDownOnce' (value) {
        this.realObject.onInputDown.addOnce(value);
    },

    'onUpAdd' (value) {
        this.realObject.onInputUp.add(value);
    },

    'onUpOnce' (value) {
        this.realObject.onInputUp.addOnce(value);
    },
};
