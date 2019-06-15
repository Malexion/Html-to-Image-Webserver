
import { ITranslationContext } from './ITranslationContext';

export interface ITranslator {
    
    ctx: ITranslationContext;
    
    convert(): Promise<string | Buffer>;

}
