# iotdb-xlsx
POP XLXS and CSV spreadsheet handling

# Examples

## Load a spreadsheet, remove empty rows

    const _ = require("iotdb-helpers")
    const xlsx = require("iotdb-xlsx")

    _.promise.make(self)
        .then(xlsx.load.p("spreadsheet.xlsx"))
        .then(xlsx.filter.empty)
        .then(_.promise.make(sd => {
            console.log(sd.jsons)
        }))
