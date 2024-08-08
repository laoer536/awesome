export const getBaseMdCode = (mode: "zh" | "en") => {
  return mode === "zh"
    ? `# awesome
my awesome🍝

[简体中文版本](https://github.com/laoer536/awesome/blob/main/README-zh.md)

`
    : `# awesome 
my awesome🍝

[english version](https://github.com/laoer536/awesome/blob/main/README.md)

`
}
