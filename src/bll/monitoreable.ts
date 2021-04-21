import { Monitor } from "./monitor";

export class Monitoreable {
  protected _monitor: Monitor;

  constructor(monitor: Monitor) {
    this._monitor = monitor;
  }
}
