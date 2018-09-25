/*
 *  lib/save.js
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
const to_file = _.promise.make((self, done) => {
    const method = "to.file"
    
    assert.ok(_.is.String(self.path), `${method}: expected self.path to be String`)
    assert.ok(self.workbook, `${method}: expected self.workbook`)

    XLSX.writeFileAsync(self.path, self.workbook, error => {
        done(error, self)
    })
})

/**
 */
const to_buffer = _.promise.make(self => {
    const method = "to.buffer"
    
    assert.ok(_.is.String(self.path), `${method}: expected self.path to be String`)
    assert.ok(self.workbook, `${method}: expected self.workbook`)

    self.document_media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    self.document_encoding = "binary"
    self.document = XLSX.write(self.workbook, {
        bookType: "xlsx",
        bookSST: false, 
        type: "buffer",
    })
})

/**
 *  API
 */
exports.save = to_file
exports.to = {
    file: to_file,
    buffer: to_buffer,
}
