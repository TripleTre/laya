function generator (event, once = false) {
    return function (callBack) {
        let events = this.realObject.events || this.realObject;
        if (once === true) {
            events['onInput' + event].addOnce(callBack);
        } else {
            events['onInput' + event].add(callBack);
        }
    };
}

export default {
    'onOverAdd':  generator('Over'),
    'onOverOnce': generator('Over', true),
    'onOutAdd':   generator('Out'),
    'onOutOnce':  generator('Out', true),
    'onDownAdd':  generator('Down'),
    'onDownOnce': generator('Down', true),
    'onUpAdd':    generator('Up'),
    'onUpOnce':   generator('Up', true),
    'inputEnabled' (value) {
        this.realObject.inputEnabled = value;
    }
};
