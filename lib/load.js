/*
 *  lib/load.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
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
    if (_.is.String(s)) {
        s = s.replace(/\s+/g, " ").trim()
        return s.length ? s : null
    } else {
        return s
    }
}

/**
 *  This does a simple translation of a spreadsheet into "self.jsons"
 */
const load = sheet_name => _.promise((self, done) => {
    const method = `load(${sheet_name})`
    
    assert.ok(self.path, `${method}: expected self.path`)

    _.promise(self)
        .validate(load)
        .then(fs.read.buffer)
        .then(_.promise(sd => {
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
        .end(done, self, "jsons")
})

load.method = "load"
load.requires = {
    document: _.is.Buffer,
}

/**
 */
const load_csv = _.promise((self, done) => {
    _.promise.validate(self, load_csv)

    const csvtojson = require("csvtojson")
    const lines = []

    let document = _.is.Buffer(self.document) ? self.document.toString("utf8") : self.document

    csvtojson({
        flatKeys: true,
        checkType: true,
        trim: true,
    })
        .fromString(self.document)
        .subscribe(
            _json => {
                const json = {}
                _.mapObject(_json, (value, key) => {
                    if (_.is.String(value)) {
                        value = _scrub(value)
                    }
                    if (value === null) {
                        return
                    }
                    
                    json[_.id.slugify(key)] = value
                })
                
                lines.push(json)
            },
            error => {
                done(error)
                done = _.noop
            },
            () => {
                self.jsons = lines;
                done(null, self)
            }
        )
})

load_csv.method = "load.csv"
load_csv.requires = {
    document: [ _.is.Buffer, _.is.String ],
}

/**
 *  Paramaterized - filename is the argument
 */
const load_p = (path, sheet_name) => _.promise((self, done) => {
    _.promise(self)
        .add("path", path)
        .then(fs.read.buffer)
        .then(load(sheet_name))
        .end(done, self, "jsons")
})

const load_csv_p = (path, sheet_name) => _.promise((self, done) => {
    _.promise(self)
        .then(_.promise.add("path", path))
        .then(fs.read.buffer)
        .then(load_csv)
        .end(done, self, "jsons")
})

/**
 *  API
 */
exports.load = load(null)
exports.load.p = path => load_p(path, null)
exports.load.sheet = load
exports.load.sheet.p = load_p
exports.load.csv = load_csv
exports.load.csv.p = load_csv_p
