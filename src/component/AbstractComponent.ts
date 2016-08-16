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
    static count: number = 0;
    private id: number;
    private rootContainer: Container<DisplayObject<any>>;
    refs: Map<string, any> = new Map<string, any>(); // tslint:disable-line

    constructor() {
        this.id = AbstractComponent.count++;
    }

    destroy() {
        this.rootContainer.destroy();
    }

    setRootContainer(value: Container<DisplayObject<any>>): void {
        this.rootContainer = value;
    }

    getId() {
        return this.id;
    }
}
