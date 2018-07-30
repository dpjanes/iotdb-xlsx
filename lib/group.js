/*
 *  lib/group.js
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

const assert = require("assert")

/**
 *  Group rows into sublists around a key
 */
const group = key => _.promise.make(self => {
    const method = "group"

    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    assert.ok(_.is.String(key), `${method}: expected parameter to be String`)

    self.groups = []
    let group_jsons
    let group_value

    self.jsons.forEach(json => {
        const value = json[key]
        if (value !== group_value) {
            group_jsons = null
        }

        if (!group_jsons) {
            group_jsons = []
            group_value = value
            
            self.groups.push(group_jsons)
        }

        group_jsons.push(json)
    })
})

/**
 *  API
 */
exports.group = group
