import { Process, State } from "./process";

export class Queue {
  private _queue: Process[] = [];

  queue(process: Process) {}

  dequeue(): Process {
    return this._queue[0];
  }

  isEmpty() {
    return this._queue.length == 0;
  }
}

const roundRobin = (quantum: number, processes: Process[]) => {
  //Order by arrival
  processes.sort(x => x.arrival);

  const readyQueue = new Queue();
  let t = 0;

  while (true) {
    // Ready at t
    const ready = processes.find(x => x.arrival == t);
    const inProgress = processes.find(x => x.state == State.Executing);

    if (ready) {
      if (inProgress) {
        readyQueue.queue(ready);
        inProgress.exec();
      } else {
        ready.exec();
      }
    }

    t++;
  }
};
