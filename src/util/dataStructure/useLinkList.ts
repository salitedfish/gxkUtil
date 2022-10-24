// 不常用，不想写了

class LinkItem<V> {
  public next: LinkItem<V> | null;
  public prev: LinkItem<V> | null;
  public value: V;
  constructor(value: V) {
    this.next = null;
    this.prev = null;
    this.value = value;
  }
}

export class LinkList<V> {
  private head: LinkItem<V> | null;
  private tail: LinkItem<V> | null;
  public length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // 类内部使用获取指定的项
  private getLinkListItem(position: number) {
    if (position >= 0 && position < this.length) {
      let currentIndex = 0;
      let current = <LinkItem<V>>this.head;
      while (currentIndex < position) {
        currentIndex = currentIndex + 1;
        current = <LinkItem<V>>current.next;
      }
      return current;
    } else {
      return null;
    }
  }
  // 追加链表
  public append(value: V) {
    const newItem = new LinkItem<V>(value);
    if (!this.tail) {
      this.head = newItem;
    } else {
      this.tail.next = newItem;
      newItem.prev = this.tail;
    }
    this.tail = newItem;
    this.length = this.length + 1;
  }
  // 插入链表头
  public unshift(value: V) {
    const newItem = new LinkItem<V>(value);
    if (!this.head) {
      this.tail = newItem;
    } else {
      this.head.prev = newItem;
      newItem.next = this.head;
    }
    this.head = newItem;
    this.length = this.length + 1;
  }
  // 插入链表中(包含头尾)
  public insert(position: number, value: V) {
    if (position === 0) {
      this.unshift(value);
    } else if (position > 0 && position < this.length) {
      const newItem = new LinkItem<V>(value);
      // 找出目标对象
      const current = this.getLinkListItem(position) as LinkItem<V>;
      // 替换目标对象的指针
      newItem.next = current;
      newItem.prev = current.prev;
      (current.prev as LinkItem<V>).next = newItem;
      current.prev = newItem;
      // length加一
      this.length = this.length + 1;
    } else if (position === this.length) {
      this.append(value);
    } else {
      return false;
    }
  }
  // 获取对应位置的元素
  public get(position: number) {
    const listItem = this.getLinkListItem(position);
    return listItem ? listItem.value : null;
  }
  // 改变对应位置的元素
  public set(position: number, value: V) {
    const listItem = this.getLinkListItem(position);
    listItem ? (listItem.value = value) : null;
  }
  // 返回指定值的下标
  //   public indexOf(value: V, options: { deep: boolean }) {}
}

export const useLinkList = <V>() => {
  return new LinkList<V>();
};
