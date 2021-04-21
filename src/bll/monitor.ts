export class Monitor {
  private _operations: string[] = [];

  add(op: string) {
    this._operations.push(op);
  }

  getOperations() {
    return this._operations;
  }
}
