export class Clock {
  autoStart: boolean;
  startTime: number;
  oldTime: number;
  elapsedTime: number;
  running: boolean;

  constructor(autoStart = true) {
      this.autoStart = autoStart;
      this.startTime = 0;
      this.oldTime = 0;
      this.elapsedTime = 0;
      this.running = false;

      if (this.autoStart) {
        this.start();
      }
  }

  start() {
      this.startTime = now();
      this.oldTime = this.startTime;
      this.elapsedTime = 0;
      this.running = true;
  }

  stop() {
      this.getElapsedTime();
      this.running = false;
      this.autoStart = false;
  }

  getElapsedTime() {
      this.getDelta();
      return this.elapsedTime;
  }

  getDelta() {
      let diff = 0;

      if (this.autoStart &&!this.running) {
          this.start();
          return 0;
      }

      if (this.running) {
          const newTime = now();
          diff = (newTime - this.oldTime) / 1000;
          this.oldTime = newTime;
          this.elapsedTime += diff;
      }

      return diff;
  }

  reset() {
      this.startTime = now();
      this.oldTime = this.startTime;
      this.elapsedTime = 0;
      if (!this.running) {
          this.running = true;
      }
  }
}

function now() {
  // Node.js environments don't have performance obj
  return (typeof performance === 'undefined'? Date : performance).now();
}
