/*
 *  lib/one.js
 *
 *  David Janes
 *  IOTDB
 *  2018-06-06
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
 *  Lets any of the other functions that take 
 *  self.jsons as an argument and run it on self.json
 */
const one = f => _.promise.make((self, done) => {
    const method = "one"

    assert.ok(_.is.Dictionary(self.json), `${method}: expected self.json to be Dictionary`)
    assert.ok(_.is.Function(f), `${method}: expected f to be a Function`)

    _.promise.make(self)
        .then(_.promise.add("jsons", [ self.json ]))
        .then(f)
        .then(_.promise.make(sd => {
            sd.json = sd.jsons[0]
        }))
        .then(_.promise.done(done, self, "json"))
        .catch(done)
})

/**
 *  API
 */
exports.one = one
