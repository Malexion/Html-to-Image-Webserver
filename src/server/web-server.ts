
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

    constructor(jsonLimit: string = '1mb', crossOrigin: boolean = false) {
        let app = express();
        this.app = app;
        
        if(crossOrigin) {
            app.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
        }

        app.use(express.json({ limit: jsonLimit }));

        app.post('/html-to-png', (req, res) => {
            processContent(new HtmlToImg('png'), req, res);
        });

        app.post('/html-to-jpeg', (req, res) => {
            processContent(new HtmlToImg('jpeg'), req, res);
        });

        app.post('/html-to-pdf', (req, res) => {
            processContent(new HtmlToImg('pdf', 'Letter'), req, res);
        });
    }

    start(port: string | number, callback?: () => void) {
        return this.app.listen(parseInt(port.toString()), callback);
    }
}
