import { useDeepClone } from ".";

type useAssignByKeyOptions = {
  exclude?: string[];
  complete?: boolean;
  deep?: boolean;
  pure?: boolean;
};

/**
 * 如果target中含有origin中的key，则把对应key的值赋给origin
 * @param origin
 * @param target
 * @param options
 */
export function useAssignByKey<T extends Record<string, unknown>, P extends Record<string, unknown>>(origin: T, target: P, options?: useAssignByKeyOptions): T {
  const _origin = options?.pure ? useDeepClone(origin)({ complete: options.complete }) : origin;
  const exclude = options?.exclude;
  for (const key in _origin) {
    if (Object.hasOwn(target, key) && (!exclude || !exclude.includes(key))) {
      _origin[key] = options?.deep ? (useDeepClone(target[key])({ complete: options?.complete }) as any) : (target[key] as any);
    }
  }
  return _origin;
}
