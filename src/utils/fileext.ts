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
    if (ext == 'js' || ext == 'ts' || ext == 'jsx' || ext == 'tsx') {
        const color1 = 'color:red;background:#ffffff;padding:1px 2px;';
        const color2 = 'color:green;background:#efefef;';
        return `${insertText}('%c code line-${line} %c \\n\\r${emoji} ${text}:\\n\\r','${color1}','${color2}',${text})`;
    }
    return `${insertText}('current line-${line}${emoji} ${text}:',${text})`;
}