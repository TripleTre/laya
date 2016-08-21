import ActivePropertyManager from '../ctrl/ActivePropertyManager';

export default function(arg1: any, propertyName: string) {
    if (typeof arg1 === 'function') {
        console.error('@data 不应该修饰静态变量。 ---> ' + arg1);
    }
    let cptName = arg1.constructor.name;
    ActivePropertyManager.addDataActiveProperty(cptName, propertyName);
}
