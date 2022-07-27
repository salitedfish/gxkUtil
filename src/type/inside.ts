/**
 * ts内置工具类型
 */

/**Omit高级类型 */

/**Pick高级类型 */

/**Record高级类型 */

/**Exclude高级类型 */

/**Extract高级类型 */

/**ReturnType高级类型 */

/**Partial高级类型 */

/**Required高级类型 */

/**Readonly高级类型 */

/**Readonly高级类型 */

/**Readonly高级类型 */
export type _Parameters<F extends Function> = F extends (...args: infer P) => any ? P : never;
