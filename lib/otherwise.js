/*
 *  lib/otherwise.js
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
 *  Default values in a row if they are not there
 */
const otherwise = od => _.promise.make(self => {
    const method = "otherwise"

    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    assert.ok(_.is.Dictionary(od), `${method}: expected parameter to be Dictionary`)

    let retained = null

    self.jsons = self.jsons.map(json => {
        json = _.d.clone(json)

        _.mapObject(od, (value, key) => {
            if (json[key] === null) {
                json[key] = od[key]
            } 
        })

        return json
    })
})

/**
 *  API
 */
exports.otherwise = otherwise
