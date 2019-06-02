
import { DOMParser, XMLSerializer } from 'xmldom';

let parser = new DOMParser();
let serializer = new XMLSerializer();

export class XDoc {

    static read(xml: string): Document {
        return parser.parseFromString(xml, 'text/html');
    }

    static write(node: Node): string {
        return serializer.serializeToString(node);
    }

}
