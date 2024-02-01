import * as readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

export default async function getUserInput() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    
        rl.setPrompt(`Write an integer `);
        rl.prompt();
    
        rl.on('line', (input) => {
            rl.close();
            resolve(input);
        });
    });
}
