import Is from './Is';

function mergeNormalsAndDirectives(normals: Array<Attr>, directives: Array<Attr>, vm: any) {
    let ret = Object.create(null);
    directives.forEach(({name, value}) => {
        let {argument: da} = parseDirective(name);
        ret[da] = vm[value];
    });
    normals.forEach(({name, value}) => {
        let pValue;
        let pName = name.replace(/\-([a-z])/g, (a: string, b: string) => b.toUpperCase());
        if (/\'\w+\'/.test(value)) { // 字符串
            pValue = value.replace(/\'/g, '');
        } else if (Is.isNumber(parseFloat(value))) { // 数值
            pValue = parseFloat(value);
        } else {
            pValue = vm[value];
        }
        ret[pName] = pValue;
    });
    return ret;
}

function parseDirective(name: string) {
    let dn;
    let da;
    if (/^l-[a-z]+$/.test(name)) {
        dn = name.match(/l-([a-z]+)/)[1];
        da = undefined;
    } else {
        dn = name.match(/l-([a-z]+)-([a-z\-]+)/)[1];
        da = name.match(/l-([a-z]+)-([a-z\-]+)/)[2]
                 .replace(/\-([a-z])/g, (a: string, b: string) => {
                     return b.toUpperCase();
                 });
    }
    return {name: dn, argument: da};
}

/**
 * 在 vm 上下文中计算表达式 exp 的值。
 */
// function calcExpression(exp: string, vm: any) {
//
// }

export {mergeNormalsAndDirectives, parseDirective};
