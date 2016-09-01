import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Game from '../display/Game';
import support from '../../decorators/Support';
import To from './To';

@support({
    require: [],
    optional: []
})
export class If extends AbstractSupportObject {
    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
    }
}
