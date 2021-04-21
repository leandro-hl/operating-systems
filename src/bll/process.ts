import { Monitor } from "./monitor";
import { Monitoreable } from "./monitoreable";

export class Process extends Monitoreable {
  private _name: string;
  private _arrival: number;
  private _state: State;
  private _service: number = 0;
  private _done: number = 0;

  constructor(p: { monitor: Monitor; name: string; arrival: number; service: number }) {
    super(p.monitor);
    this._name = p.name;
    this._arrival = p.arrival;
    this._service = p.service;
    this._state = State.Ready;
  }

  setExecuting() {
    this._state = State.Executing;
  }

  setReady() {
    this._state = State.Ready;
  }

  setFinished() {
    this._state = State.Done;
  }

  exec() {
    this._monitor.add(this._name);
    this._done++;
  }

  arrivesAt(t: number) {
    return this._arrival == t;
  }

  getArrival() {
    return this._arrival;
  }

  hasFinished() {
    return this._done == this._service;
  }
}

export enum State {
  Ready,
  Executing,
  Done
}

export class Operation {
  type: OperationType;
  service: number;
  done: number;

  isDone() {
    return this.service == this.done;
  }
}

export enum OperationType {
  CPU,
  IO
}
