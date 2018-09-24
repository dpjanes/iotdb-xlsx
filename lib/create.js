/*
 *  lib/create.js
 *
 *  David Janes
 *  IOTDB
 *  2018-09-24
 *
 *  Copyright [2013-2018] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

const _ = require("iotdb-helpers")
const fs = require("iotdb-fs")

const XLSX = require("xlsx")

const assert = require("assert")

const _scrub = s => {
    s = s.replace(/\s+/g, " ").trim()
    return s.length ? s : null
}

/**
 */
const create = sheet_name => _.promise.make((self, done) => {
    const method = `create(${sheet_name})`
    
    assert.ok(_.is.String(self.path), `${method}: expected self.path to be String`)
    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)

    sheet_name = sheet_name || "Sheet 1"

    _.promise.make(self)
        /*
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
        */
        .then(_.promise.done(done, self))
        .catch(done)
})

/**
 *  API
 */
exports.create = create(null)
exports.create.p = path => load_p(path, null)
exports.create.sheet = create
exports.create.sheet.p = load_p