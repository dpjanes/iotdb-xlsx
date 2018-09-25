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

const XLSX = require("xlsx")

const assert = require("assert")

/**
 */
const create = _.promise.make(self => {
    const method = "create"
    
    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    
    let sheet_name = self.sheet_name
    if (!sheet_name) {
        if (self.workbook) {
            sheet_name = `Sheet ${self.workbook.SheetNames.length + 1}`
        } else {
            sheet_name = "Sheet 1"
        }
    }

    const json = []
    const keys = []

    if (self.header) {
        const header = []

        self.header.forEach(v => {
            if (_.is.String(v)) {
                keys.push(v)
                header.push(v)
            } else if (_.is.Dictionary(v)) {
                if (!v.key) {
                    assert.ok(false, `${method}: expected 'key' in header field`)
                }

                if (v.name) {
                    header.push(v.name)
                    keys.push(v.key)
                } else {
                    header.push(v.key)
                    keys.push(v.key)
                }
            } else {
                assert.ok(false, `${method}: header field to be String or Dictionary`)
            }
        })

        json.push(header)
    }

    self.jsons.forEach(row => {
        if (_.is.Array(row)) {
            json.push(row)
        } else if (_.is.Dictionary(row)) {
            if (!self.header) {
                assert.ok(false, `${method}: self.header is required if you want to use Dictionary rows`)
            }

            json.push(keys.map(key => {
                const value = row[key]
                if (_.is.Undefined(value)) {
                    return null
                } else {
                    return value
                }
            }))
        } else {
            assert.ok(false, `${method}: rows must be Array or Dictionary`)
        }
    })

    const ws = XLSX.utils.json_to_sheet(json, {
        skipHeader: true,
    })

    if (!self.workbook) {
        self.workbook = XLSX.utils.book_new()
    }

    XLSX.utils.book_append_sheet(self.workbook, ws, sheet_name)
})

/**
 *  API
 */
exports.create = create
