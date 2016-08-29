import {LayaContainer} from '../../abstract/LayaInterface';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import Game from './Game';
import display from '../../decorators/Display';
import Graphics from './Graphics';

@display({
    require: [],
    optional: ['name']
})
export default class Container extends AbstractDisplayObject implements LayaContainer {
    realContainer: Phaser.Group;

    constructor(game: Game, require: any, optional: any, id: number) {
        super(id);
        this.realContainer = new Phaser.Group(game.realGame, null, optional.name);
    }

    add(obj: AbstractDisplayObject): void {
        this.realContainer.add(obj.getRealObject());
    }

    remove(child, destroy): boolean {
        return this.realContainer.remove(child, destroy);
    }

    getRealObject(): Phaser.Group {
        return this.realContainer;
    }

    destroy(): void {
        this.realContainer.destroy(true);
    }

    set Mask(value: Graphics) {
        this.realContainer.mask = value.getRealObject();
    }
}
