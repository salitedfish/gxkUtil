/**
 * 随便写的Ref和ref的实现
 */
export class RefGen<T> {
  data: T;
  readonly _is_ref: true;
  constructor(data: T) {
    this.data = data;
    this._is_ref = true;
  }

  get value() {
    // todo: track
    return this.data;
  }

  set value(data: T) {
    // todo: trigger
    this.data = data;
  }
}
interface Ref<T> {
  value: T;
}
export const isRef = (data: any | Ref<any>): boolean => {
  if (data._is_ref) {
    return true;
  } else {
    return false;
  }
};
export function ref<T>(data: Ref<T>): Ref<T>;
export function ref<T>(data: T): Ref<T>;
export function ref<T>(data: T | Ref<T>): any {
  if (isRef(data)) {
    return data;
  } else {
    return new RefGen(data);
  }
}

const a: Ref<number> = ref(1);
const b = ref<number>(a);

a.value = 3;
b.value = 2;
