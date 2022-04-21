module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
            },
            animation: {
                reveal: 'reveal 0.5s ease-in-out',
                color: 'color 8s linear infinite',
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
                color: {
                    '0%':       { color: '#000' },
                    '12.5%':    { color: '#00f' },
                    '25%':      { color: '#0f0' },
                    '37.5%':    { color: '#0ff' },
                    '50%':      { color: '#f00' },
                    '62.5%':    { color: '#f0f' },
                    '75%':      { color: '#ff0' },
                    '87.5%':    { color: '#fff' },
                    '100%':     { color: '#000' },
                },
            },
        },
    },
};
