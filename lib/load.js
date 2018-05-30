/*
 *  lib/load.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

const _ = require("iotdb-helpers")

const XLSX = require("xlsx")

const assert = require("assert")

/**
 *  This does a simple translation of a spreadsheet into "rows"
 */
const load_xlsx = sheet_name => _.promise.make((self, done) => {
    const method = "interface.xlsx.load"
    
    assert.ok(self.path, `${method}: expected self.path`)

    const _scrub = s => {
        s = s.replace(/\s+/g, " ").trim()
        return s.length ? s : null
    }

    _.promise.make(self)
        .then(fs.read.buffer)
        .then(_.promise.make(sd => {
            const workbook = XLSX.read(sd.document);
            const worksheet = workbook.Sheets[sheet_name || workbook.SheetNames[0]];

            const rss = XLSX.utils.sheet_to_json(worksheet, {
                header: 1, defval: ""
            })

            if (rss.length < 2) {
                sd.rows = []
                return
            }

            const header = rss  
                .shift()
                .map(h => _.id.slugify(h))

            sd.rows = rss
                .map(rs => _.zipObject(header, rs.map(c => _scrub(c))))
                .map(rs => {
                    delete rs['']
                    return rs
                })
        }))
        .then(_.promise.done(done, self, "rows"))
        .catch(done)
})
