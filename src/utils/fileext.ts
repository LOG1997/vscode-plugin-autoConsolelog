const extArr: any = {
    'js': 'console.log',
    'ts': 'console.log',
    'jsx': 'console.log',
    'tsx': 'console.log',
    'vue': 'console.log',
    'py': 'print',
    'rs': 'println!',
    'java': 'System.out.println',
};

export function setInsertText(line: number | string = '', ext: string = '', emoji: string = '', text: string = '') {
    console.log('😉ext:', ext);
    const insertText = extArr[ext] || extArr['js'];
    if (ext === 'js' || ext === 'ts' || ext === 'jsx' || ext === 'tsx') {
        return `${insertText}("code line-${line} \\n\\r${emoji} ${text}:\\n\\r",${text});`;
    }
    if (ext === 'rs') {
        return `${insertText}("code line-${line} ${emoji} ${text}:\\n\\r{:?}",${text});`;
    }
    return `${insertText}("code line-${line}${emoji} ${text}:",${text})`;
}