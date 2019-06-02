
import express, { Express, Request, Response } from 'express';
import { HtmlToImg } from '../translators/html-to-img';
import { ITranslator } from '../translators/ITranslator';

async function processContent(translator: ITranslator, req: Request, res: Response) {
    let html = req.body.content || '';
    if(html) {
        try {
            let file = await translator.convert(<string>html);
            res.status(200);
            res.send({ msg: 'Success', file });
        } catch(err) {
            res.status(500);
            res.send({ msg: err, file: null });
        }
    } else {
        res.status(500);
        res.send({ msg: 'No Data to Convert!', file: null });
    }
}

export class WebServer {
    app: Express;

    constructor(jsonLimit = '10mb') {
        let app = express();
        this.app = app;

        app.use(express.json({ limit: jsonLimit }));

        app.post('/html-to-png', (req, res) => {
            processContent(new HtmlToImg('png'), req, res);
        });

        app.post('/html-to-jpeg', (req, res) => {
            processContent(new HtmlToImg('jpeg'), req, res);
        });
    }

    start(port: string | number, callback?: () => void) {
        return this.app.listen(<number>port, callback);
    }
}
