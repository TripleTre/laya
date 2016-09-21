export function forEachKey<T>(keys: any, fn: (value: T) => void): void {
    let next;
    while (next = keys.next(), !next.done) {
        fn(next.value);
    }
}
