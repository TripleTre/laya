"use strict";
function deepGet(path, obj) {
    return path.reduce(function (o, node, index, path) {
        if (o === undefined) {
            return 0;
        }
        return o[node];
    }, obj);
}
function deep(current, path, next, last, result) {
    if (Array.isArray(current)) {
        for (var i = 0, len = current.length; i < len; i++) {
            var _path = path.concat([]);
            _path.push(i);
            if (deepGet(_path, last) !== current[i]) {
                deep(current[i], _path, next, last, result);
            }
        }
    }
    else if (typeof current === 'object' && current !== null) {
        for (var attr in current) {
            if (current.hasOwnProperty(attr)) {
                var _path = path.concat([]);
                _path.push(attr);
                var oldItem = deepGet(_path, last);
                var newItem = current[attr];
                if (oldItem !== newItem) {
                    deep(newItem, _path, next, last, result);
                }
            }
        }
    }
    else if (typeof current === 'number' || typeof current === 'boolean' || typeof current === 'string' || typeof current === 'undefined' || current === null) {
        var old = deepGet(path, last);
        var newVal = deepGet(path, next);
        if (old !== newVal) {
            result.push({
                path: path.join('.'),
                old: old,
                newVal: newVal
            });
        }
    }
    else {
        console.error('no execute');
    }
    return result;
}
exports.__esModule = true;
exports["default"] = deep;
var gameDefault = {
    mode: 'normal',
    state: 'STANDY',
    device: '',
    searchObj: {},
    sessionToken: '',
    connect: {
        state: '',
        code: {}
    },
    uid: '',
    loadState: false,
    roomId: '',
    config: {
        state: false,
        value: {}
    },
    currentFlow: [],
    auto: false,
    featureId: -1,
    featureFlow: [],
    featureFlowIndex: -1
};
var a = Object.assign({}, gameDefault, {
    auto: true
});
var b = Object.assign({}, a, {
    connect: {
        code: {
            v: '001'
        }
    }
});
console.log(deep(b, [], b, gameDefault, []));
