import Is from './Is';
declare var process;

const ignoreWords = 'true,false,null,undefined,Infinity,NaN';
const ignoreWordsRE = new RegExp('\\b' + ignoreWords.replace(/,/g, '\\b|\\b') + '\\b');
const improperKeywords =
    '{,},this,Math,Date' +
    'break,case,class,catch,const,continue,debugger,default,' +
    'delete,do,else,export,extends,finally,for,function,if,' +
    'import,in,instanceof,let,return,super,switch,throw,try,' +
    'var,while,with,yield,enum,await,implements,package,' +
    'protected,static,interface,private,public';
const improperKeywordsRE = new RegExp('\\b' + improperKeywords.replace(/,/g, '\\b|\\b') + '\\b');

// 'abc'+88* ppp ==={xxx: 'yyy'} ? true : false
function expressionVars(expression: string): Array<string> {
    if (improperKeywordsRE.test(expression)) {
        console.error('表达式包含不支持的关键字', improperKeywords, expression);
        return [];
    }
    let ms: Array<string> = expression.match(/.?\b[a-zA-Z._$]+\b.?/g);
    if (Is.isAbsent(ms)) {
        return [];
    } else {
        return ms.filter(v => !/(^'\w+'$)/.test(v) && !ignoreWordsRE.test(v))
                 .map(v => v.match(/[a-zA-Z]+/)[0]);
    }
}

function expToFunction(exp: string): Function {
    expressionVars(exp).forEach(v => {
        exp = exp.replace(v, 'vm.' + v);
    });
    try {
        return new Function('vm', 'return ' + exp);
    } catch (e) {
        if (process.env.NODE_ENV === 'development') {
            throw e;
        } else {
            return function(){}; // tslint:disable-line
        }
    }
}

function mergeNormalsAndDirectives(normals: Array<Attr>, directives: Array<Attr>, vm: any): any {
    let ret = Object.create(null);
    directives.forEach(({name, value}) => {
        let calc = expToFunction(value);
        let {argument: da} = parseDirective(name);
        ret[da] = calc(vm);
    });
    normals.forEach(({name, value}) => {
        let calc = expToFunction(value);
        ret[name] = calc(vm);
    });
    return ret;
}

function parseDirective(name: string): {name: string, argument: string} {
    let dn;
    let da;
    try {
        dn = name.match(/^l-([a-z]+)/)[1];
        da = name.replace(/^l-[a-z]+/, '')
                    .replace('-', '')
                    .replace(/\-([a-z])/g, (a: string, b: string) => {
                        return b.toUpperCase();
                    });
    } catch (e) {
        console.error('指令格式有誤: ', name, e);
    }
    return {name: dn, argument: da};
}

/**
 * 在 vm 上下文中计算表达式 exp 的值。
 */
// function calcExpression(exp: string, vm: any) {
//
// }

export {
    mergeNormalsAndDirectives,
    parseDirective,
    expressionVars,
    expToFunction
};
