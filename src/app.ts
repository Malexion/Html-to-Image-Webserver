
import { WebServer } from './server/web-server';

let server = new WebServer(process.env.SIZE_LIMIT || '10mb', !!process.env.CROSS_ORIGIN);

server.start(process.env.PORT || 3000)
    .then((port) => console.log(`Server Started on Port: ${port}`));
