
import puppeteer, { PDFFormat } from 'puppeteer';
import { ITranslator } from './ITranslator';
import { clean } from '../utilities/clean';
import { getViewport } from '../utilities/get-viewport';

type downloadType = 'jpeg' | 'png' | 'pdf';

export class HtmlToImg implements ITranslator {

    fileType: downloadType;
    formatType: PDFFormat;

    constructor(fileType: downloadType = 'png', format: PDFFormat = 'A4') {
        this.fileType = fileType;
        this.formatType = format;
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
        await page.emulateMedia('screen');
        if(this.fileType == 'png' || this.fileType == 'jpeg') {
            return await page.screenshot({
                type: this.fileType,
                encoding: 'binary',
                omitBackground: true
            });
        } else if(this.fileType == 'pdf') {
            return await page.pdf({
                format: this.formatType
            });
        } else
            throw "Unknown Download Type";
    }

}
