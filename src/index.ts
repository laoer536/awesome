import csvParser from "csv-parser"
import fs from "fs"

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

function updateMd() {
  const mode = Bun.argv.slice(-1)[0] as "en" | "zh"
  getCsvInfo(MD_FROM_INFO[mode]).then((res) => {
    console.log(res)
  })
}

updateMd()
