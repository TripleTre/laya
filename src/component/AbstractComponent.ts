import {Container,
        DisplayObject} from '../abstract/index';

/**
 * AbstractComponentConstructor 指定了Component 的构造函数规范
 * AbstractComponent 指定了Component 实例的规范
 * 所有 Component 必须继承自 AbstractComponent 接口
 */
export interface AbstractComponentConstructor {
    new (): AbstractComponent;
}

export abstract class AbstractComponent {
    private getterMap: Map<Function, string> = new Map<Function, string>();
    private id: number;
    private rootContainer: Container<DisplayObject<any>>;
    refs: Map<string, any> = new Map<string, any>(); // tslint:disable-line

    destroy() {
        this.rootContainer.destroy();
    }

    setRootContainer(value: Container<DisplayObject<any>>): void {
        this.rootContainer = value;
    }

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    addGetterMap(getter: Function, attribute: string): void {
        this.getterMap.set(getter, attribute);
    }

    getterAttribute(getter: Function): string {
        return this.getterMap.get(getter);
    }
}
