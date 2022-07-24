import { Button } from '@kabukki/wasm-nes';

export class Input extends EventTarget {
    constructor ({ id, type }) {
        super();
        this.id = id;
        this.type = type;
        this.value = Button.None;
        this.keymap = {};
    }

    press (button) {
        if ((this.value & button) === 0) {
            this.value |= button;
            this.dispatchEvent(new CustomEvent('press', { detail: button }));
        }
    }

    release (button) {
        if ((this.value & button) > 0) {
            this.value &= ~button;
            this.dispatchEvent(new CustomEvent('release', { detail: button }));
        }
    }

    reset () {
        this.value = Button.None;
    }

    isPressed (button) {
        return (this.value | button) > 0;
    }
}

export class Keyboard extends Input {
    constructor () {
        super({ id: 'Keyboard', type: 'keyboard' });
        this.keymap = {
            [Button.A]: ' ',
            [Button.B]: 'Meta',
            [Button.Select]: 'Shift',
            [Button.Start]: 'Enter',
            [Button.Up]: 'ArrowUp',
            [Button.Down]: 'ArrowDown',
            [Button.Left]: 'ArrowLeft',
            [Button.Right]: 'ArrowRight',
        };
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
        for (const [button, key] of Object.entries(this.keymap)) {
            if (key === e.key) {
                e.preventDefault();
                switch (e.type) {
                    case 'keydown': this.press(button); break;
                    case 'keyup': this.release(button); break;
                }
            }
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
        super({ id, type: 'gamepad' });
        this.rafHandle = null;
        this.keymap = {
            [Button.A]: GamepadButton.A,
            [Button.B]: GamepadButton.B,
            [Button.Select]: GamepadButton.Back,
            [Button.Start]: GamepadButton.Start,
            [Button.Up]: GamepadButton.Up,
            [Button.Down]: GamepadButton.Down,
            [Button.Left]: GamepadButton.Left,
            [Button.Right]: GamepadButton.Right,
        };
    }

    monitor () {
        const gamepad = [...navigator.getGamepads()].find((gamepad) => gamepad?.id === this.id);

        if (gamepad) {
            // Button controls
            for (const button of [Button.A, Button.B, Button.Select, Button.Start]) {
                const key = this.keymap[button];
    
                if (gamepad.buttons[key].pressed) {
                    this.press(button);
                } else {
                    this.release(button);
                }
            }
    
            // Joystick + arrows controls
            if (gamepad.axes[0] <= -0.5 || gamepad.buttons[GamepadButton.Left].pressed) {
                this.press(Button.Left);
            } else {
                this.release(Button.Left);
            }
            
            if (gamepad.axes[0] >= 0.5 || gamepad.buttons[GamepadButton.Right].pressed) {
                this.press(Button.Right);
            } else {
                this.release(Button.Right);
            }
    
            if (gamepad.axes[1] <= -0.5 || gamepad.buttons[GamepadButton.Up].pressed) {
                this.press(Button.Up);
            } else {
                this.release(Button.Up);
            }
            
            if (gamepad.axes[1] >= 0.5 || gamepad.buttons[GamepadButton.Down].pressed) {
                this.press(Button.Down);
            } else {
                this.release(Button.Down);
            }
        }

        this.rafHandle = requestAnimationFrame(this.monitor.bind(this));
    }

    stop () {
        cancelAnimationFrame(this.rafHandle);
        this.rafHandle = null;
    }
}
