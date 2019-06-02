
export interface ITranslator {
    
    convert(html: string): Promise<string | Buffer>;

}
