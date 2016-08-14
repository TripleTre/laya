import {AbstractComponent} from '../../component/AbstractComponent';
import Application from '../../ctrl/Application';
import {DisplayObject} from '../../abstract/index';

declare interface Directive {
    name: string;
    /**
     * @param name 组件的注册名
     * @param self 使用指令的组件
     * @param target 绑定的Phaser对象, 或组件对象
     * @param argument 指令的参数
     * @param value 指令的值
     * @param app Application 对象
     */
    bind(name: string, self: AbstractComponent, target: any, argument: string, value: string, app: Application): void;
    unbind(): void;
}

export default Directive;