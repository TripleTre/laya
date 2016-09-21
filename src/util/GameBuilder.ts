import LayaGame from '../phaser/display/Game';

export default class GameBuilder {
    private gameInfo: any = Object.create(null);

    static getInstance() {
        return new GameBuilder();
    }

    setWidth(width: number | string): GameBuilder {
        this.gameInfo['width'] = width;
        return this;
    }

    setHeight(height: number | string): GameBuilder {
        this.gameInfo['height'] = height;
        return this;
    }

    setRender(render: number): GameBuilder {
        this.gameInfo['render'] = render;
        return this;
    }

    setParent(parent: any): GameBuilder {
        this.gameInfo['parent'] = parent;
        return this;
    }

    setState(state: any): GameBuilder {
        this.gameInfo['state'] = state;
        return this;
    }

    setTransparent(transparent: boolean): GameBuilder {
        this.gameInfo['transparent'] = transparent;
        return this;
    }

    setAntialias(antialias: boolean): GameBuilder {
        this.gameInfo['antialias'] = antialias;
        return this;
    }

    setPhysicsConfig(physicsConfig: any): GameBuilder {
        this.gameInfo['physicsConfig'] = physicsConfig;
        return this;
    }

    build(): LayaGame {
        return new LayaGame(new Phaser.Game(this.gameInfo.width,
            this.gameInfo.height,
            this.gameInfo.renderer,
            this.gameInfo.parent,
            this.gameInfo.state,
            this.gameInfo.transparent,
            this.gameInfo.antialias,
            this.gameInfo.physicsConfig));
    }
};
