/*
 *  lib/map.js
 *
 *  David Janes
 *  IOTDB
 *  2018-06-01
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

const assert = require("assert")

/**
 *  Change the keys 
 */
const map_keys = (d, retain) => _.promise.make(self => {
    const method = "map.keys"

    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    assert.ok(_.is.Dictionary(d), `${method}: expected parameter to be Dictionary`)

    self.jsons = self.jsons.map(_json => {
        const json = {}

        _.mapObject(_json, (value, _key) => {
            const key = d[_key]
            if (key) {
                json[key] = value
            } else {
                if (retain) {
                    json[_key] = value
                }
            }
        })

        return json
    })
})

const map = f => _.promise.make(self => {
    self.jsons = self.jsons.map(f)
})

const map_values = f => _.promise.make(self => {
    self.jsons = self.jsons.map(_json => {
        const json = {}

        _.mapObject(_json, (_value, _key) => {
            const value = f(_key, _value, _json)
            if (!_.is.Undefined(value)) {
                json[_key] = value
            }
        })

        return json
    })
})

/**
 *  API
 */
exports.map = map
exports.map.keys = map_keys
exports.map.values = map_values
