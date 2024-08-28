export const getBaseMdCode = (mode: "zh" | "en") => {
  return mode === "en"
    ? `# awesome
my awesome🍝

[简体中文版本](https://github.com/laoer536/awesome/blob/main/README-zh.md)

> The document is generated using CSV files as data. Using Git hooks to execute scripts and generate final documents before Git submission.

`
    : `# awesome 
my awesome🍝

[english version](https://github.com/laoer536/awesome/blob/main/README.md)

> 文档采用csv文件作为数据进行生成。利用git钩子实现git提交前执行脚本生成最终文档。

`
}
