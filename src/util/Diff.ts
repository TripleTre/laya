interface DiffResult {
    newVal: any,
    old: any,
    path: string
}

export default function deep(current, path, next, last, result): Array<DiffResult> {
    if (Array.isArray(current)) {
        for (let i = 0, len = current.length; i < len; i++) {
            let _path = path.concat([]);
            _path.push(i);
            deep(current[i], _path, next, last, result);
        }
    } else if (typeof current === 'object' && current !== null) {
        for (let attr in current) {
            if (current.hasOwnProperty(attr)) {
                let _path = path.concat([]);
                _path.push(attr);
                let item = current[attr];
                deep(item, _path, next, last, result);
            }
        }
    } else if (typeof current === 'number' || typeof current === 'boolean' || typeof current === 'string' || typeof current === 'undefined' || current === null) {
        let old = path.reduce(function(o, node, index, path) {
            if (o === undefined) {
                return 0;
            }
            return o[node];
        }, last);
        let newVal = path.reduce(function(o, node, index, path) {
            if (o === undefined) {
                return 0;
            }
            return o[node];
        }, next);
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
