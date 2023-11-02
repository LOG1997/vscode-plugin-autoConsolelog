// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { entitiestoUtf16 } from "./utils/emoji";
import path = require("path");
import { setInsertText } from './utils/fileext';
import { textOption } from "./utils/text";
const emojiArr = [
    "\u{1f600}",
    "\u{1f601}",
    "\u{1f602}",
    "\u{1f603}",
    "\u{1f604}",
    "\u{1f605}",
    "\u{1f606}",
    "\u{1f607}",
    "\u{1f608}",
    "\u{1f609}",
    "\u{1f60A}",
    "\u{1f60B}",
    "\u{1f60C}",
    "\u{1f60D}",
    "\u{1f60E}",
    "\u{1f60F}",
    "\u{1f610}",
    "\u{1f611}",
    "\u{1f612}",
    "\u{1f613}",
    "\u{1f614}",
    "\u{1f615}",
];
const insertText = (text: any) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const selection = editor.selection;
    const range = new vscode.Range(selection.start, selection.end);
    editor.edit((editBuilder: any) => {
        editBuilder.replace(range, text);
    });
};
// 判断文件类型
const judgeFileType = () => {
    const editor = vscode.window.activeTextEditor;
    const filePath = editor && editor.document.uri.fsPath;
    let ext = 'js';
    if (filePath) {
        ext = path.extname(filePath).slice(1);
    }

    return ext;
};
// 获取当前选择行数
const getSelectLine = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const selection = editor.selection;
    const line = selection.start.line;

    return line;
};
// 移动光标到指定行指定列
const moveCursor = (line: number, column: number) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const newPosition = new vscode.Position(line, column);
    editor.selection = new vscode.Selection(newPosition, newPosition);
};
// 插件激活时执行一次，立即执行
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "clog" is now active!');
    // 注册一个命令，命令执行时，执行下面函数
    let disposable = vscode.commands.registerCommand("clog.clog", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const selection = editor.selection;
        let text = "";
        let actionInsertLineCommand = "editor.action.insertLineAfter";
        const clipboard = vscode.env.clipboard;
        const clipboardText = await clipboard.readText().then((res) => {
            return Promise.resolve(res);
        });
        if (selection.start === selection.end) {
            text = clipboardText;
        } else {
            text = editor.document.getText(selection);
        }
        // 获取当前行字符串
        const lineText = editor.document.lineAt(selection.start.line).text;

        if (lineText.includes('{')) {
            const { firstText, lastText, textLen } = textOption(lineText);
            const rangeAll = new vscode.Range(selection.start.line, 0, selection.start.line, textLen);

            editor.edit(
                editBuilder => {
                    editBuilder.replace(rangeAll, `${firstText}`);
                }
            );
            await vscode.commands.executeCommand("editor.action.insertLineAfter");
            insertText(lastText);
            actionInsertLineCommand = "editor.action.insertLineBefore";
        }

        // 向编辑器插入一行
        let emojiIndex = Math.floor(Math.random() * emojiArr.length);
        vscode.commands.executeCommand(actionInsertLineCommand).then(() => {
            const emojiData = entitiestoUtf16(emojiArr[emojiIndex]);
            const ext = judgeFileType();
            const line = getSelectLine();
            const logText = setInsertText(line, ext, emojiData, text);
            // 在插入的空白行插入文本
            insertText(logText);
        });

    });
    // 监听上面注册的命令
    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
