// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { entitiestoUtf16 } from "./utils/emoji";
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

    const clipboard = vscode.env.clipboard;
    const clipboardText = await clipboard.readText().then((res) => {
      return Promise.resolve(res);
    });
    if (selection.start === selection.end) {
      text = clipboardText;
    } else {
      text = editor.document.getText(selection);
    }
    // 向编辑器插入一行
    let emojiIndex = Math.floor(Math.random() * emojiArr.length);
    vscode.commands.executeCommand("editor.action.insertLineAfter").then(() => {
      const emojiData = entitiestoUtf16(emojiArr[emojiIndex]);
      const logText = `console.log('${emojiData}${text}:',${text})`;
      // 在插入的空白行插入文本
      insertText(logText);
    });
  });
  // 监听上面注册的命令
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
