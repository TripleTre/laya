export interface Container<T> {
    add(obj: T): void;

    remove(obj: T, destory: boolean): boolean;

    destroy(): void;
}

export interface DisplayObject<T> {
    getRealObject(): T;
    destroy(): void;
}

export interface Game {
    setWorld(world: World): void;
    getWorld(): World;
    senceJump(state: string, clearWorld?: boolean, clearCache?: boolean): void;
    registerSence(key: string, state: any);
}

export interface State {
    create?(): void;
    preLoad?(): void;
    update?(): void;
}

export interface World extends Container<DisplayObject<any>> {}
