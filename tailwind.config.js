module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
            },
            animation: {
                reveal: 'reveal 0.5s ease-in-out',
            },
            keyframes: {
                reveal: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(-0.1em)',
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
            },
        },
    },
};
