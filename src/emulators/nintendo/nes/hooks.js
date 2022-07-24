import { useEffect, useState } from 'react';

import { Keyboard, Gamepad, Store } from '../../../common';

const db = new Store();

export const useInput = ({ onPress, onRelease} = {}) => {
    const [inputs, setInputs] = useState(() => [new Keyboard()]);
    const [players, setPlayers] = useState(() => [inputs[0], null]);

    const setPlayer = (player, input) => {
        setPlayers((previous) => {
            const players = previous.slice();
            players[player] = input;
            return players;
        });
    };

    useEffect(() => {
        inputs[0].monitor();
        window.addEventListener('gamepadconnected', ({ gamepad }) => {
            setInputs((previous) => {
                const input = new Gamepad({ id: gamepad.id });
                input.monitor();
                return previous.concat(input);
            });
        });
        window.addEventListener('gamepaddisconnected', ({ gamepad }) => {
            setInputs((previous) => {
                const input = previous.find(({ id }) => id === gamepad.id);

                if (input) {
                    input.stop();
                    setPlayers((previous) => previous.map((player) => player.id === input.id ? null : player));
                    return previous.filter(({ id }) => id !== input.id);
                } else {
                    return previous;
                }
            });
        });
    }, []);

    useEffect(() => {
        const callbacks = players.map((p, n) => ({
            press: ({ detail: button }) => onPress(n, button),
            release: ({ detail: button }) => onRelease(n, button),
        }));

        for (const [n, player] of players.entries()) {
            player?.addEventListener('press', callbacks[n].press);
            player?.addEventListener('release', callbacks[n].release);
        }

        return () => {
            for (const [n, player] of players.entries()) {
                player?.removeEventListener('press', callbacks[n].press);
                player?.removeEventListener('release', callbacks[n].release);
            }
        };
    }, [players, onPress, onRelease]);

    return {
        inputs,
        players,
        setPlayer,
    };
};
