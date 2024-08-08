import csvParser from "csv-parser"
import fs from "fs"
import { baseMdCode } from "./utils"

interface CsvInfo {
  type: string
  group: string
  name: string
  url: string
  description: string
}

const MD_FROM_INFO = {
  en: "src/data/en.csv",
  zh: "src/data/zh.csv",
}

function getCsvInfo(path: string): Promise<CsvInfo[]> {
  const csvInfo: CsvInfo[] = []
  return new Promise((resolve) => {
    fs.createReadStream(path)
      .pipe(csvParser())
      .on("data", (data) => csvInfo.push(data))
      .on("end", () => {
        resolve(csvInfo)
      })
  })
}

function convertToMarkdown(data: any, level = 2) {
  let markdown = ""
  for (const [key, value] of Object.entries(data)) {
    markdown += `${"#".repeat(level)} ${key}\n\n`
    if (Array.isArray(value)) {
      value.forEach((item) => {
        markdown += `- **${item.name}**: [${item.url}](${item.url})\n`
        if (item.description) {
          markdown += `  - ${item.description}\n`
        }
      })
      markdown += "\n"
    } else if (typeof value === "object") {
      markdown += convertToMarkdown(value, level + 1)
    }
  }
  return markdown
}

function updateMd() {
  const mode = Bun.argv.slice(-1)[0] as "en" | "zh"
  getCsvInfo(MD_FROM_INFO[mode]).then((res) => {
    const typeGroup = Object.groupBy(res, ({ type }) => type)
    const types = Object.keys(typeGroup)
    let type: keyof typeof typeGroup
    for (type of types) {
      // @ts-ignore
      typeGroup[type] = Object.groupBy(typeGroup[type], ({ group }) => group)
    }
    fs.writeFileSync(
      mode === "en" ? "README.md" : "README-zh.md",
      baseMdCode + convertToMarkdown(typeGroup),
      "utf-8",
    )
  })
}

updateMd()
