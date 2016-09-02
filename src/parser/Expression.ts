import Is from '../util/Is';

declare var process;
const ignoreWords = 'true,false,null,undefined,Infinity,NaN';
const ignoreWordsRE = new RegExp('\\b' + ignoreWords.replace(/,/g, '\\b|\\b') + '\\b');
const improperKeywords =
    'this,Math,Date' +
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
    let list = [];
    expression = expression.replace(/\{.*:(.*)\}/g, (a, b, c, d) => {
        let s = list.concat(b.replace(/'[^']*'/g, '')
                    .match(/\b[a-z]([a-zA-Z._$0-9]+)?\b/g));
        if (Is.isPresent(s)) {
            list = list.concat(s);
        }
        return '';
    });
    let ms: Array<string> = expression.replace(/'[^']*'/g, '')
                                      .match(/\b[a-z]([a-zA-Z._$0-9]+)?\b/g);
    if (Is.isPresent(ms)) {
        list = list.concat(ms);
    }
    return list.filter(v => !ignoreWordsRE.test(v));
}

let test = "'abc'+ 88 * ppp === {y: 150 * (reel.length - xxx - 3)} ? true : false";
console.log(expressionVars(test));

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
        let reg = new RegExp('([^.a-zA-Z]|^)(' + v + ')');
        exp = exp.replace(reg, (a, b, c) => {
            return a.replace(c, 'vm.' + c);
        });
    });
    try {
        let fn = <(context: any) => any>new Function('vm', 'return ' + exp);
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
