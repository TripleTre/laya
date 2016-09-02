import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';

@display({
    require: ['x', 'y', 'key'],
    optional: ['frame']
})
class Tmage extends AbstractDisplayObject {
    private image: Phaser.Image;

    // constructor(game: Game, require: any, optional: any, id: number) {
    //     super(id);
    //     this.image = new Phaser.Image(game.realGame, require.x, require.y, require.key, optional.frame);
    // }

    buildRealObject(game, require, optional) {
        this.image = new Phaser.Image(game.realGame, require.x, require.y, require.key, optional.frame);
    }

    destroy(): void {
        this.image.destroy();
    }

    getRealObject(): Phaser.Image {
        return this.image;
    }

    set x (value) {
        this.image.x = value;
    }

    set y (value) {
        this.image.y = value;
    }

    set key (value) {
        // console.warn('image 的 key 属性不能做绑定');
    }

    set anchorX (value) {
        this.image.anchor.x = value;
    }

    set anchorY (value) {
        this.image.anchor.y = value;
    }

    set scaleX (value) {
        this.image.scale.x = value;
    }

    set scaleY (value) {
        this.image.scale.y = value;
    }

    set visible (value) {
        this.image.visible = value;
    }
}

export default Tmage;
