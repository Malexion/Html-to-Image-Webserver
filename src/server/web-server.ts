
import express, { Express, Request, Response } from 'express';
import { HtmlToImg } from '../translators/html-to-img';
import { ITranslator } from '../translators/ITranslator';
const cors = require('cors');

async function processContent(translator: ITranslator, req: Request, res: Response) {
    console.log(`PROCESS: ${translator.ctx.type}`);
    if(translator.ctx && translator.ctx.content) {
        try {
            let file = await translator.convert();
            res.status(200);
            res.send({ msg: 'Success', file });
            console.log(`SUCCESS`);
        } catch(err) {
            res.status(500);
            res.send({ msg: err, file: null });
            console.log(`ERROR: ${err}`);
        }
    } else {
        res.status(500);
        res.send({ msg: 'No Data to Convert!', file: null });
        console.log('ERROR: No Data to Convert!');
    }
}

export class WebServer {
    app: Express;

    constructor(jsonLimit: string = '1mb', crossOrigin: boolean = false) {
        let app = express();
        this.app = app;
        
        if(crossOrigin) {
            app.use(cors());
        }

        app.use(express.json({ limit: jsonLimit }));

        app.options('/html-to-png', cors());
        app.post('/html-to-png', (req, res) => {
            processContent(new HtmlToImg({ type: 'png', ...req.body }), req, res);
        });

        app.options('/html-to-jpeg', cors());
        app.post('/html-to-jpeg', (req, res) => {
            processContent(new HtmlToImg({ type: 'jpeg', ...req.body }), req, res);
        });

        app.options('/html-to-pdf', cors());
        app.post('/html-to-pdf', (req, res) => {
            processContent(new HtmlToImg({ type: 'pdf', ...req.body }), req, res);
        });
    }

    start(port: string | number): Promise<number> {
        let portInt = parseInt(port.toString());
        return new Promise(done => {
            this.app.listen(portInt, () => {
                done(portInt);
            });
        });
    }
}
