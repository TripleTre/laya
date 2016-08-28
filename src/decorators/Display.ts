export interface DisplayLike {
    require: Array<string>,
    optional?: Array<string>
}

export default function ({require, optional = []}: DisplayLike) {
    return function (targetConstructor: any) {
        targetConstructor.$$require = require;
        targetConstructor.$$optional = optional;
    };
}
