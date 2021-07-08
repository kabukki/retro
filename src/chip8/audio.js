export class EmulatorAudio {
    constructor (type) {
        this.type = type;
        this.ctx = new window.AudioContext();
        this.oscillator = null;
    }

    play () {
        if (!this.oscillator) {
            this.oscillator = this.ctx.createOscillator();
            this.oscillator.connect(this.ctx.destination);
            this.oscillator.type = this.type;
            this.oscillator.frequency.value = 440;
            this.oscillator.start();
        }
    }
    
    pause () {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator = null;
        }
    }
}
