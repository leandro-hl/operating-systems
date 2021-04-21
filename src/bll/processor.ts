import { Process } from "./process";

export class Processor {
  private _inProgress: Process;
  private _osProcess: Process;

  constructor(osProcess: Process) {
    this._osProcess = osProcess;
  }

  setProcess(process: Process) {
    process.setExecuting();
    this._inProgress = process;
  }

  exec() {
    if (!this.isExecuting()) {
      //if no process to run execute os process by default
      this._inProgress = this._osProcess;
    }
    this._inProgress.exec();
  }

  isExecuting() {
    return this._inProgress != null;
  }

  remove() {
    const inProgress = this._inProgress;
    this._inProgress = null;
    return inProgress;
  }

  hasFinished() {
    const process = this._inProgress;
    return process.hasFinished();
  }
}
