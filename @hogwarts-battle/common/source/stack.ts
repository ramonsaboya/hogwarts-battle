export class Stack<T> {
  private items: T[] = [];

  constructor(initialItems?: T[]) {
    if (initialItems) {
      this.items = [...initialItems];
    }
  }

  get getItems(): T[] {
    return this.items;
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  draw(amount: number): T[] {
    const drawnCards: T[] = [];
    while (amount > 0) {
      drawnCards.push(this.pop()!);
      amount--;
    }
    return drawnCards;
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  length(): number {
    return this.items.length;
  }
}
