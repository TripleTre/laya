export interface SupportLike {
    require: Array<string>,
    optional?: Array<string>,
    name: string
}

export default function ({require, optional = [], name}: SupportLike) {
    return function (targetConstructor: any) {
        targetConstructor.$$name = name;
        targetConstructor.$$require = require;
        targetConstructor.$$optional = optional;
    };
}
