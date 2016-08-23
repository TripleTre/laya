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
    private repeatScope: Map<string, Array<any>> = new Map<string, Array<any>>();
    private repeatIndex: Map<string, number> = new Map<string, number>();
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

    addToRepeatScope(name: string, value: any) {
        this.repeatScope.set(name, value);
        debugger;
        Object.defineProperty(this, name, {
            get() {
                return this.repeatScope.get(name)[this.repeatIndex.get(name)];
            }
        });
    }

    setRepeatIndex(name: string, index: number) {
        this.repeatIndex.set(name, index);
    }
}