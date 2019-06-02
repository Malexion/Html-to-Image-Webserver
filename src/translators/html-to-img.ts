
import puppeteer from 'puppeteer';
import { ITranslator } from './ITranslator';
import { clean } from '../utilities/clean';
import { getViewport } from '../utilities/get-viewport';

export class HtmlToImg implements ITranslator {

    fileType: "jpeg" | "png" | undefined;

    constructor(fileType: "jpeg" | "png" | undefined = 'png') {
        this.fileType = fileType;
    }
    
    async convert(html: string): Promise<string | Buffer> {
        const content = clean(html);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport(getViewport(content));
        await page.setContent(`
            <html lang="en">
                <body>
                    ${content}
                </body>
            </html>
        `);
        return await page.screenshot({
            type: this.fileType,
            encoding: 'binary',
            omitBackground: true
        });
    }

}


// import fs from 'fs';

// const file = 'radar';

// (async () => {
//     try {
//         let html = fs.readFileSync(`${__dirname}/../${file}.svg`, { encoding: 'utf8' });
        
    
//         fs.writeFileSync(`${__dirname}/../${file}.png`, image);
//     } catch(err) {
//         console.log(err);
//     }

// })();
