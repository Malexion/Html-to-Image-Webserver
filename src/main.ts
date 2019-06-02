
import { WebServer } from './server/web-server';

let server = new WebServer();

server.start(process.env.PORT || 3000, () => console.log('Server Started'));
