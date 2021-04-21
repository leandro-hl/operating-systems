export class Process {
  name: string;
  arrival: number;
  state: State;
  operation: Operation;

  private _burntQuantum: number;

  exec() {
    console.log(this.name);
    this._burntQuantum++;
    this.operation.done++;
    this.state = State.Executing;
  }

  reachedQuantumLimit(quantumLimit: number) {
    const reached = this._burntQuantum == quantumLimit;

    if (reached) {
      this._burntQuantum = 0;
      this.state = this.operation.isDone() ? State.Done : State.Ready;
    }

    return reached;
  }
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

export enum State {
  Ready,
  Executing,
  Done
}
