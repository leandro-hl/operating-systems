import { Process } from "./process";

export class ProcessRepository {
  private _processes: Process[] = [];

  add(process: Process) {
    this._processes.push(process);

    return this;
  }

  prepare() {
    this._processes.sort(x => x.getArrival());
  }

  getNext(t: number) {
    return this._processes.find(x => x.arrivesAt(t));
  }

  count() {
    return this._processes.length;
  }
}
