import {LayaGame} from '../../abstract/LayaInterface';
import World from './World';
import * as Phaser from 'phaser';
import GameBuilder from '../../util/GameBuilder';
import {AbstractSence} from '../../abstract/AbstractSence';

export default class Game implements LayaGame {
    realGame: Phaser.Game;
    world: World;

    constructor(game: Phaser.Game) {
        this.realGame = game;
    }

    setWorld(world: World) {
        this.world = world;
    }

    getWorld() {
        return this.world;
    }

    getRealObject(): Phaser.Game {
        return this.realGame;
    }

    senceJump(sence: string, clearWorld?: boolean, clearCache?: boolean): void {
        this.realGame.state.start(sence, clearWorld, clearCache);
    }

    registerSence(key: string, state: AbstractSence): void {
        this.realGame.state.add(key, state);
    }

    startSence(name: string, clearWorld: boolean, clearCache?: boolean): void {
        this.realGame.state.start(name, clearWorld, clearCache);
    }

    destroy() {
        this.realGame.destroy();
    }
}
