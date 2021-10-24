import { Button, InputType } from '@kabukki/wasm-nes';

export class Input extends EventTarget {
    constructor ({ id, type }) {
        super();
        this.id = id;
        this.type = type;
        this.value = Button.None;
        this.buffer = this.value;
    }

    commit () {
        if (this.buffer !== this.value) {
            this.value = this.buffer;
            this.dispatchEvent(new CustomEvent('update', { detail: this.value }));
        }
        this.buffer = Button.None;
    }

    press (button) {
        this.buffer |= button;
    }

    release (button) {
        this.buffer &= ~button;
    }

    reset () {
        this.buffer = Button.None;
    }

    isPressed (button) {
        return (this.value | button) > 0;
    }
}

export class Keyboard extends Input {
    static keymap = {
        ' ': Button.A,
        'Escape': Button.B,
        'Shift': Button.Select,
        'Enter': Button.Start,
        'ArrowUp': Button.Up,
        'ArrowDown': Button.Down,
        'ArrowLeft': Button.Left,
        'ArrowRight': Button.Right,
    };

    constructor ({ id = 'Keyboard' } = {}) {
        super({ id, type: InputType.Keyboard });
    }

    monitor () {
        document.addEventListener('keyup', this.onKey.bind(this));
        document.addEventListener('keydown', this.onKey.bind(this));
    }

    stop () {
        document.removeEventListener('keyup', this.onKey.bind(this));
        document.removeEventListener('keydown', this.onKey.bind(this));
    }

    onKey (e) {
        if (e.key in Keyboard.keymap) {
            console.log(e.key);
            e.preventDefault();
            switch (e.type) {
                case 'keydown': this.press(Keyboard.keymap[e.key]); break;
                case 'keyup': this.release(Keyboard.keymap[e.key]); break;
            }

            this.commit();
        }
    }
}

/**
 * Gamepad button standard order
 * https://w3c.github.io/gamepad/#remapping
 */
 export const GamepadButton = {
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    LB: 4,
    RB: 5,
    LT: 6,
    RT: 7,
    Back: 8,
    Start: 9,
    LeftJoystick: 10,
    RightJoystick: 11,
    Up: 12,
    Down: 13,
    Left: 14,
    Right: 15,
    Home: 16,
}

export class Gamepad extends Input {
    static keymap = {
        [GamepadButton.A]: Button.A,
        [GamepadButton.B]: Button.B,
        [GamepadButton.Back]: Button.Select,
        [GamepadButton.Start]: Button.Start,
        [GamepadButton.Up]: Button.Up,
        [GamepadButton.Down]: Button.Down,
        [GamepadButton.Left]: Button.Left,
        [GamepadButton.Right]: Button.Right,
    };

    constructor ({ id }) {
        super({ id, type: InputType.Gamepad });
        this.rafHandle = null;
    }

    monitor () {
        const gamepad = [...navigator.getGamepads()].find((gamepad) => gamepad?.id === this.id);

        this.reset();

        // Button controls
        for (const key in Gamepad.keymap) {
            const button = gamepad.buttons[key];
    
            if (button.pressed) {
                this.press(Gamepad.keymap[key]);
            } else {
                this.release(Gamepad.keymap[key]);
            }
        }

        // Joystick controls
        if (gamepad.axes[0] <= -0.5) {
            this.press(Button.Left);
        } else if (gamepad.axes[0] >= 0.5) {
            this.press(Button.Right);
        }

        if (gamepad.axes[1] <= -0.5) {
            this.press(Button.Up);
        } else if (gamepad.axes[1] >= 0.5) {
            this.press(Button.Down);
        }

        this.commit();

        this.rafHandle = requestAnimationFrame(this.monitor.bind(this));
    }

    stop () {
        cancelAnimationFrame(this.rafHandle);
        this.rafHandle = null;
    }
}
