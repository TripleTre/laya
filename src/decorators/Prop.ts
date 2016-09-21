export default function(arg1: any, propertyName: string) {
    if (typeof arg1 === 'function') {
        console.error('@data 不应该修饰静态变量。 ---> ' + arg1);
    }
    if (arg1.constructor.$$prop === undefined) {
        arg1.constructor.$$prop = [];
    }
    arg1.constructor.$$prop.push(propertyName);
}
