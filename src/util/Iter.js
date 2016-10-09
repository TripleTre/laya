"use strict";
function forEachKey(keys, fn) {
    var next;
    while (next = keys.next(), !next.done) {
        fn(next.value);
    }
}
exports.forEachKey = forEachKey;
