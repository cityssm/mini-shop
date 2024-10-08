import Debug from 'debug';
const debug = Debug('mini-shop:serverFunctions');
export const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES': {
            console.error('Requires elevated privileges');
            process.exit(1);
            break;
        }
        case 'EADDRINUSE': {
            console.error('Port is already in use.');
            process.exit(1);
            break;
        }
        default: {
            throw error;
        }
    }
};
export const onListening = (server) => {
    const addr = server.address() ?? '127.0.0.1';
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port.toString()}`;
    debug(`Listening on ${bind}`);
};
