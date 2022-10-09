// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
// 插入console函数

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
    console.log("clibptord:", clipboardText);
    if (selection.start === selection.end) {
      text = clipboardText;
    } else {
      text = editor.document.getText(selection);
    }
    // 向编辑器插入一行
    vscode.commands.executeCommand("editor.action.insertLineAfter").then(() => {
      const logText = `console.log('${text}:',${text})`;
      // 在插入的空白行插入文本
      insertText(logText);
    });
  });
  // 监听上面注册的命令
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
