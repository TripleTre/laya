import ActivePropertyManager from '../ctrl/ActivePropertyManager';

export default function (getter: (state: any, context: any) => any, compare: boolean = false) {
    return function (arg1: any, name: string) {
        if (typeof arg1 === 'function') {
            console.error('@data 不应该修饰静态变量。 ---> ' + arg1);
        }
        let cptName = arg1.constructor.name;
        ActivePropertyManager.addGetterActiveProperty(cptName, {
            getter,
            compare,
            name
        });
    };
}
