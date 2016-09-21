export interface DisplayLike {
    require: Array<string>,
    optional?: Array<string>,
    name: string
}

export default function ({require, optional = [], name}: DisplayLike) {
    return function (targetConstructor: any) {
        targetConstructor.$$name = name;
        targetConstructor.$$require = require;
        targetConstructor.$$optional = optional;
    };
}
