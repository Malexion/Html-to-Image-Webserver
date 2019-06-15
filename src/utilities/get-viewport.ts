
import { XDoc } from "./xdocument";
import { Viewport } from "puppeteer";
import { ITranslationContext } from '../translators/ITranslationContext';

export function getViewport(ctx: ITranslationContext): Viewport {
    let html = ctx.content || '',
        width = ctx.width || 1920,
        height = ctx.height || 1080;
    let doc = XDoc.read(html);
    let firstChild = doc.documentElement;
    
    if(firstChild) {
        height = Math.ceil(parseFloat(firstChild.getAttribute('height') || height.toString())) + 20;
        width = Math.ceil(parseFloat(firstChild.getAttribute('width') || width.toString())) + 20;
    }
    
    return { width, height };
};
