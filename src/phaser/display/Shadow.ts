import Game from '../display/Game';
import support from '../../decorators/Support';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';

/**
 *  shadow 并不是一个DisplayObject, shadow的子元素会添加到它的父container里.
 *  shadow 只是为了方便使用 l-repeat 指令而存在
 */
@support({
    require: []
})
export default class Shadow extends AbstractSupportObject {

    constructor(game: Game, require: any, optional: any) {
        super();
    }
}
