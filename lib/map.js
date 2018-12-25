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
const map_keys = (d, retain) => _.promise(self => {
    assert.ok(_.is.Dictionary(d), `${map_keys.method}: expected parameter to be Dictionary`)

    self.jsons = self.jsons.map(old_json => {
        const new_json = {}

        _.mapObject(old_json, (old_value, old_key) => {
            const new_key = d[old_key]
            if (_.is.Function(new_key)) {
                const new_value = new_key(old_key, old_value, old_json)
                if (_.is.Dictionary(new_value)) {
                    _.mapObject(new_value, (nnv, nnk) => {
                        new_json[nnk] = nnv
                    })
                }
            } else if (_.is.String(new_key)) {
                new_json[new_key] = old_value
            } else if (retain) {
                new_json[old_key] = old_value
            }
        })

        return new_json
    })
})

map_keys.method = "map.keys"
map_keys.requires = {
    jsons: _.is.Array,
}

/**
 *  This is much like the traditional concept of "map"
 */
const map = f => _.promise(self => {
    self.jsons = self.jsons.map(f)
})

/**
 *  Given a function "f", map each json in jsons
 */
const map_values = f => _.promise(self => {
    self.jsons = self.jsons.map(old_json => {
        const new_json = {}

        _.mapObject(old_json, (old_value, old_key) => {
            new_json[old_key] = f(old_key, old_value, old_json)
        })

        return new_json
    })
})

/**
 *  API
 */
exports.map = map
exports.map.keys = map_keys
exports.map.values = map_values
