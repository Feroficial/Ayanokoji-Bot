import { exec } from 'child_process';

setInterval(() => {
    exec('pgrep -f "node index.js"', (err, stdout) => {
        if (!stdout.trim()) {
            console.log('⚠️ Bot caído, reiniciando...');
            exec('node index.js &');
        }
    });
}, 60000); // cada minuto