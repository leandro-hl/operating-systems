import { expect } from "chai";
import { Monitor } from "../bll/monitor";
import { Process } from "../bll/process";
import { Processor } from "../bll/processor";
import { ProcessRepository } from "../bll/processRepository";
import { roundRobin } from "../bll/scheduling";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("Scheduling algorithms", () => {
  describe("Round Robin", () => {
    it("should return expected output", () => {
      //Arrange
      const monitor = new Monitor();

      const osProcess = new Process({ monitor, name: "OS", arrival: 0, service: 1 });
      const processA = new Process({ monitor, name: "A", arrival: 5, service: 2 });
      const processB = new Process({ monitor, name: "B", arrival: 2, service: 4 });
      const processC = new Process({ monitor, name: "C", arrival: 1, service: 3 });
      const processD = new Process({ monitor, name: "D", arrival: 0, service: 4 });

      const repo = new ProcessRepository();

      repo.add(processA).add(processB).add(processC).add(processD);

      const amd = new Processor(osProcess);
      const quantum = 2;

      //Act
      roundRobin(quantum, repo, amd);

      //Assert
      const expected = ["D", "D", "C", "C", "D", "D", "B", "B", "C", "A", "A", "B", "B"];

      expect(monitor.getOperations()).to.eql(expected);
    });

    it("no processes should only execute os process", () => {
      //Arrange
      const monitor = new Monitor();

      const osProcess = new Process({ monitor, name: "OS", arrival: 0, service: 2 });

      const repo = new ProcessRepository();

      const amd = new Processor(osProcess);
      const quantum = 2;

      //Act
      roundRobin(quantum, repo, amd);

      //Assert
      const expected = ["OS", "OS"];

      expect(monitor.getOperations()).to.eql(expected);
    });
  });
});
