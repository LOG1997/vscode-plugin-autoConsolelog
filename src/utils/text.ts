export function textOption(text: string) {
    const textArr = text.split('');
    const braceIndexLast = textArr.lastIndexOf('{');
    const textLen = textArr.length;
    return {
        firstText: textArr.slice(0, braceIndexLast + 1).join(''),
        lastText: textArr.slice(braceIndexLast + 1).join(''),
        textLen
    };
}