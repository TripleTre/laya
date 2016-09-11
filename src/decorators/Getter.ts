import ActivePropertyManager from '../ctrl/ActivePropertyManager';

export default function (path: string) {
    return function (arg1: any, name: string) {
        if (typeof arg1 === 'function') {
            console.error('@getter 不应该修饰静态变量。 ---> ' + arg1);
        }
        let cptName = arg1.constructor.name;
        ActivePropertyManager.addWaiteExecute(cptName, {
            path,
            name
        }, 'getter');
        if (arg1.constructor.$$getter === undefined) {
            arg1.constructor.$$getter = [];
        }
        arg1.constructor.$$getter.push({
            path,
            name
        });
    };
}
