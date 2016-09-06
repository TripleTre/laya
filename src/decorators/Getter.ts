import ActivePropertyManager from '../ctrl/ActivePropertyManager';

export default function (getter: (state: any, context: any) => any, compare: boolean = true) {
    return function (arg1: any, name: string) {
        if (typeof arg1 === 'function') {
            console.error('@getter 不应该修饰静态变量。 ---> ' + arg1);
        }
        let cptName = arg1.constructor.name;
        ActivePropertyManager.addWaiteExecute(cptName, {
            getter,
            compare,
            name
        }, 'getter');
        if (arg1.constructor.$$getter === undefined) {
            arg1.constructor.$$getter = [];
        }
        arg1.constructor.$$getter.push({
            getter,
            compare,
            name
        });
    };
}
