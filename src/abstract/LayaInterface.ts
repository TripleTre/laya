import {AbstractSenceConstructor, AbstractSence} from './AbstractSence';
import {AbstractDisplayObject} from './AbstractDisplay';

export interface LayaContainer extends AbstractDisplayObject {
    add(obj: AbstractDisplayObject): void;

    remove(obj: AbstractDisplayObject, destory: boolean): boolean;

    destroy(): void;
}

export interface LayaGame extends AbstractDisplayObject {
    setWorld(world: LayaWorld);
    getWorld(): LayaWorld;
    startSence(name: string, clearWorld: boolean, clearCache?: boolean): void;
    registerSence(key: string, sence: AbstractSence);
}

export interface Sence {
    create?(): void;
    preLoad?(): void;
    update?(): void;
}

export interface LayaWorld extends LayaContainer {}
