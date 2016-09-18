import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';

@display({
    require: ['x', 'y', 'key'],
    optional: ['frame'],
    name: 'Sprite'
})
class Tmage extends AbstractDisplayObject {
    private realObject: Phaser.Sprite;

    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Sprite(game.realGame, require.x, require.y, require.key, optional.frame);
    }

    destroy(): void {
        this.realObject.destroy(true);
        this.realObject = null;
    }

    getRealObject(): Phaser.Image {
        return this.realObject;
    }

    set x(value) {
        this.realObject.x = value;
    }

    set y(value) {
        this.realObject.y = value;
    }

    set key(value) {
        // console.warn('sprite 的 key 属性不能做绑定');
    }

    set anchorX(value) {
        this.realObject.anchor.x = value;
    }

    set anchorY(value) {
        this.realObject.anchor.y = value;
    }

    set scaleX(value) {
        this.realObject.scale.x = value;
    }

    set scaleY(value) {
        this.realObject.scale.y = value;
    }

    set visible(value) {
        this.realObject.visible = value;
    }

    set frame(value) {
        let key: any = this.realObject.key;
        this.realObject.setFrame(this.realObject.game.cache.getFrameByName(key, value));
    }

    set Animation(value) {
        let data = value.generatData();
        let name = Date.now().toString(16);
        let real = this.realObject.animations.add(name, data.frames, data.frameRate, data.loop, data.useNumericIndex);
        value.setRealObject(real);
    }
}

export default Tmage;
