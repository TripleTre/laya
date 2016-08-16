import app from '../index';

export default function(arg1: any, propertyName: string) {
    if (typeof arg1 === 'function') {
        console.error('@getter 不应该修饰静态变量。 ---> ' + arg1);
    }
    let cptName = arg1.constructor.name;
    app.addDataPropertyForComponent(cptName, propertyName, 'getter');
}
