import Is from '../util/Is';

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

let cache = Object.create(null);

// 'abc'+88* ppp ==={xxx: 'yyy'} ? true : false
/**
 *  提取表达式中的所有变量
 * 
 * @para expression 表达式
 * @return 表达式中的所有变量
 */
export function expressionVars(expression: string): Array<string> {
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

/**
 *  将表达式转化成函数
 * @para exp 表达式字符串
 * @para vars 表达式中的变量, 这些变量都是viewModel上的属性
 * @return 转换后的函数
 */
export function expToFunction(exp: string, vars?: Array<string>): (context: any) => any {
    let exist = cache[exp];
    if (Is.isPresent(exist)) {
        return exist;
    }
    if (Is.isAbsent(vars)) {
        vars = expressionVars(exp);
    }
    vars.forEach(v => {
        exp = exp.replace(v, 'vm.' + v);
    });
    try {
        let fn = <(context: any) => any>new Function('context', 'return ' + exp);
        cache[exp] = fn;
        return fn;
    } catch (e) {
        if (process.env.NODE_ENV === 'development') {
            throw e;
        } else {
            return function(){}; // tslint:disable-line
        }
    }
}
