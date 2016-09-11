export default class ObjectManager {
    private static objects: Map<number, any> = new Map<number, any>();

    static getObject<T>(id): T{
        return ObjectManager.objects.get(id);
    }
}