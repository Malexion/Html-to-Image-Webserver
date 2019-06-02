
import { XDoc } from "./xdocument";

const xmlns = 'http://www.w3.org/2000/svg';

export function clean(html: string): string {
    let doc = XDoc.read(html);
    let svgs = doc.getElementsByTagName('svg');
    for(let i = 0; i < svgs.length; i++) {
        svgs[i].setAttribute('xmlns', xmlns);
    }
    return XDoc.write(doc);
};
