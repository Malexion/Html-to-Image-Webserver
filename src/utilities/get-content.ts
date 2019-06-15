
import { ITranslationContext } from '../translators/ITranslationContext';
import { clean } from './clean';

export function getContent(ctx: ITranslationContext): string {
    let html = clean(ctx.content || '');
    return ctx.raw ? html : `
        <html lang="en">
            <body>
                ${html}
            </body>
        </html>
    `;
};
