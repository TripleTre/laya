import {Container,
        DisplayObject} from './LayaObject';
import {AbstractSence} from './AbstractSence';
import {Getter} from '../ctrl/DirectiveManager';

/**
 * AbstractComponentConstructor 指定了Component 的构造函数规范
 * AbstractComponent 指定了Component 实例的规范
 * 所有 Component 必须继承自 AbstractComponent 接口
 */
export interface AbstractComponentConstructor {
    new (): AbstractComponent;
}

export abstract class AbstractComponent {
    private own: AbstractComponent | AbstractSence;
    private id: number;
    private rootContainer: Container<DisplayObject>;
    private getterProperty: Map<Getter, string> = new Map<Getter, string>();

    refs: Map<string, any> = new Map<string, any>(); // tslint:disable-line

    destroy(): void {
        this.rootContainer.destroy();
    }

    setRootContainer(value: Container<DisplayObject>): void {
        this.rootContainer = value;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getOwn(): AbstractComponent | AbstractSence {
        return this.own;
    }

    setOwn(own: AbstractComponent | AbstractSence): void {
        this.own = own;
    }

    addToGetterProperty(getter: Getter, property: string): void {
        this.getterProperty.set(getter, property);
    }

    getGetterProperty(getter: Getter): string {
        return this.getterProperty.get(getter);
    }
}
