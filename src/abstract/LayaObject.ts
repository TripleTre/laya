import {AbstractSenceConstructor, AbstractSence} from './AbstractSence';

export interface Container<T> {
    add(obj: T): void;

    remove(obj: T, destory: boolean): boolean;

    destroy(): void;
}

export interface DisplayObject {
    getRealObject<T>(): T;
    destroy(): void;
}

export interface Game {
    setWorld(world: World): void;
    getWorld(): World;
    startSence(name: string, clearWorld: boolean, clearCache?: boolean): void;
    registerSence(key: string, sence: AbstractSence);
}

export interface Sence {
    create?(): void;
    preLoad?(): void;
    update?(): void;
}

export interface World extends Container<DisplayObject> {}
