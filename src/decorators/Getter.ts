import app from '../index';

export default function (getter: Function, force: boolean = false) {
    return function (arg1: any, name: string) {
        if (typeof arg1 === 'function') {
            console.error('@data 不应该修饰静态变量。 ---> ' + arg1);
        }
        let cptName = arg1.constructor.name;
        app.addGetterPropertyForComponent(cptName, {
            getter,
            force,
            name
        });
    };
}
