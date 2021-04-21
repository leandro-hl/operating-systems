import { Processor } from "./processor";
import { ProcessRepository } from "./processRepository";
import { Queue } from "./queue";

const roundRobin = (quantum: number, repo: ProcessRepository, processor: Processor) => {
  const readyQueue = new Queue();
  let done = 0;
  let t = 0;
  let burnt = 0;

  while (true) {
    // Ready at t
    const ready = repo.getNext(t);

    if (ready) {
      if (processor.isExecuting()) {
        readyQueue.queue(ready);
      } else {
        processor.setProcess(ready);
      }
    }

    processor.exec();
    burnt++;
    t++;

    if (burnt == quantum || processor.hasFinished()) {
      burnt = 0;
      const inProgress = processor.remove();

      if (!inProgress.hasFinished()) {
        inProgress.setReady();
        readyQueue.queue(inProgress);
      } else {
        inProgress.setFinished();
        done++;
      }

      if (!readyQueue.isEmpty()) {
        const higherPriority = readyQueue.dequeue();
        processor.setProcess(higherPriority);
      }
    }

    //end of life sygnal. +1 due that os call
    if (done >= repo.count() && !processor.isExecuting()) {
      break;
    }
  }
};

export { roundRobin };
