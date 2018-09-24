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
const save = _.promise.make((self, done) => {
    const method = "save"
    
    assert.ok(_.is.String(self.path), `${method}: expected self.path to be String`)
    assert.ok(self.workbook, `${method}: expected self.workbook`)

    XLSX.writeFileAsync(self.path, self.workbook, error => {
        done(error, self)
    })
})

/**
 *  API
 */
exports.save = save
