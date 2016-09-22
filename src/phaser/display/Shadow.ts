import support from '../../decorators/Support';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';

/**
 *  shadow 并不是一个DisplayObject, shadow的子元素会添加到它的父container里.
 *  shadow 只是为了方便使用 l-repeat 指令而存在
 */
@support({
    require: [],
    name: 'Shadow'
})
export default class Shadow extends AbstractDisplayObject<any> {

    buildRealObject(game, require, optional) {
        //
    }

    getRealObject() {
        return undefined;
    }

    destroy() {
        // this.getChildren().clear();
    }
}
