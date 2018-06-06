/*
 *  lib/filter.js
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

const _ = require("iotdb-helpers")

const assert = require("assert")

/**
 *  Restrict rows to those matching the filter
 */
const filter = f => _.promise.make(self => {
    const method = "filter"

    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    assert.ok(_.is.Function(f), `${method}: expected parameter to be Function`)

    self.jsons = self.jsons.filter(f)
})

/**
 *  All values in the dictionary must match
 */
const filter_d = d => _.promise.make(self => {
    self.jsons = self.jsons.filter(json => {
        let ok = true

        _.mapObject(d, (d_value, key) => {
            const j_value = json[key]
            if (!_.is.Equal(j_value, d_value)) {
                ok = false
            }
        })

        return ok
    })
})

/**
 *  API
 */
exports.filter = filter
exports.filter.empty = filter(json => _.values(json).filter(value => value !== null).length !== 0)
exports.filter.d = filter_d
