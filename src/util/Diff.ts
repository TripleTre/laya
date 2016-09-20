interface DiffResult {
    newVal: any,
    old: any,
    path: string
}

function deepGet(path, obj) {
    return path.reduce(function(o, node, index, path) {
        if (o === undefined) {
            return 0;
        }
        return o[node];
    }, obj);
}

export default function deep(current, path, next, last, result): Array<DiffResult> {
    if (Array.isArray(current)) {
        for (let i = 0, len = current.length; i < len; i++) {
            let _path = path.concat([]);
            _path.push(i);
            if (deepGet(_path, last) !== current[i]) {
                deep(current[i], _path, next, last, result);
            }
        }
    } else if (typeof current === 'object' && current !== null) {
        for (let attr in current) {
            if (current.hasOwnProperty(attr)) {
                let _path = path.concat([]);
                _path.push(attr);
                let oldItem = deepGet(_path, last);
                let newItem = current[attr];
                if (oldItem !== newItem) {
                    deep(newItem, _path, next, last, result);
                }
            }
        }
    } else if (typeof current === 'number' || typeof current === 'boolean' || typeof current === 'string' || typeof current === 'undefined' || current === null) {
        let old = deepGet(path, last);
        let newVal = deepGet(path, next);
        if (old !== newVal) {
            result.push({
                path: path.join('.'),
                old,
                newVal
            });
        }
    } else {
        console.error('no execute');
    }
    return result;
}

let gameDefault = {
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

let a = Object.assign({}, gameDefault, {
    auto: true
});

let b = Object.assign({}, a, {
    connect: {
        code: {
            v: '001'
        }
    }
});

console.log(deep(b, [], b, gameDefault, []));
