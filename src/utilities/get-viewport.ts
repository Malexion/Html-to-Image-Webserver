
import { XDoc } from "./xdocument";
import { Viewport } from "puppeteer";

const xmlns = 'http://www.w3.org/2000/svg';

export function getViewport(html: string): Viewport {
    let width = 1920,
        height = 1080;
    let doc = XDoc.read(html);
    let firstChild = doc.documentElement;
    
    if(firstChild) {
        height = Math.ceil(parseFloat(firstChild.getAttribute('height') || firstChild.clientHeight.toString() || height.toString())) + 20;
        width = Math.ceil(parseFloat(firstChild.getAttribute('width') || firstChild.clientWidth.toString() || width.toString())) + 20;
    }
    
    return { width, height };
};
