import { Process } from "./process";

export class Queue {
  private _queue: Process[] = [];
  private _pivot: number;

  queue(process: Process) {
    process.setReady();
    this._queue.push(process);
  }

  dequeue(): Process {
    return this._queue.shift();
  }

  isEmpty() {
    return this._queue.length == 0;
  }
}
