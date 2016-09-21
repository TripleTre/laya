import {AbstractSence} from './AbstractSence';
import {AbstractDisplayObject} from './AbstractDisplay';

export interface LayaContainer extends AbstractDisplayObject<any> {
    add(obj: AbstractDisplayObject<any>): void;

    remove(obj: AbstractDisplayObject<any>, destory: boolean): boolean;

    destroy(): void;
}

export interface LayaGame {
    getRealObject<T>(): T;
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

export interface LayaWorld extends AbstractDisplayObject<any> {
    add(obj: AbstractDisplayObject<any>): void;

    remove(obj: AbstractDisplayObject<any>, destory: boolean): boolean;

    destroy(): void;
}
