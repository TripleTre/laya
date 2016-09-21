export default function (path: string) {
    return function (arg1: any, name: string) {
        if (typeof arg1 === 'function') {
            console.error('@getter 不应该修饰静态变量。 ---> ' + arg1);
        }
        if (arg1.constructor.$$getter === undefined) {
            arg1.constructor.$$getter = [];
        }
        arg1.constructor.$$getter.push({
            path,
            name
        });
    };
}
