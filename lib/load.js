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
 *  This does a simple translation of a spreadsheet into "self.jsons"
 */
const load = sheet_name => _.promise.make((self, done) => {
    const method = `load(${sheet_name})`
    
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
                sd.jsons = []
                return
            }

            const header = rss  
                .shift()
                .map(h => _.id.slugify(h))

            sd.jsons = rss
                .map(rs => _.zipObject(header, rs.map(c => _scrub(c))))
                .map(rs => {
                    delete rs['']
                    return rs
                })
        }))
        .then(_.promise.done(done, self, "jsons"))
        .catch(done)
})

/**
 *  API
 */
exports.load = load(null)
exports.load.sheet = load
