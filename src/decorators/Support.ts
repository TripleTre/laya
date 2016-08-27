export interface SupportLike {
    require: Array<string>,
    optional?: Array<string>
}

export default function ({require, optional = []}: SupportLike) {
    return function (targetConstructor: any) {
        targetConstructor.$$require = require;
        targetConstructor.$$optional = optional;
    };
}
