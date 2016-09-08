import Is from '../util/Is';

export default class WatchFunctionManager {
    private static watchs: Map<string, Array<{property: string, func: string}>> = new Map<string, Array<{property: string, func: string}>>();

    static addToWatchs(cptName: string, property: string, func: string): void {
      let ws = WatchFunctionManager.watchs.get(cptName);
      if (Is.isAbsent(ws)) {
          WatchFunctionManager.watchs.set(cptName, []);
      }
      WatchFunctionManager.watchs.get(cptName).push({
        property,
        func
      });
    }

    static getWatchs(name: string) {
        let list = WatchFunctionManager.watchs.get(name);
        if (Is.isAbsent(list)) {
          return [];
        }
        return list;
    }

    static deleteWatchs(name: string) {
        WatchFunctionManager.watchs.delete(name);
    }
}

window['_WatchFunctionManger'] = WatchFunctionManager;
