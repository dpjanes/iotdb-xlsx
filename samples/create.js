/**
 *  samples/create.js
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
const xlsx = require("..")

const assert = require("assert")

const minimist = require("minimist")

const ad = minimist(process.argv.slice(2));
const action_name = ad._[0]

const actions = []
const action = name => {
    actions.push(name)

    return action_name === name
}

if (action("create")) {
    _.promise.make({
        path: "sample.xlsx",
        jsons: [
            [ "A", "B", "C" ],
            [ new Date(), null, true ],
            [ 1, 2, 3 ],
        ]
    })
        .then(xlsx.create)
        .then(_.promise.make(sd => {
            console.log("+", "ok")
        }))
        .catch(error => {
            console.log("#", _.error.message(error))
            process.exit(1)
        })
} else if (action("create-dictionary")) {
    _.promise.make({
        path: "sample.xlsx",
        header: [ 
            {
                "name": "When",
                "key": "date",
            },
            {
                "name": "Reason",
                "key": "reason",
            },
            "weight",
        ],
        jsons: [
            {
                date: new Date("2001-01-01"),
                reason: "IDK",
                weight: 100,
            },
            {
                date: new Date("2012-12-25"),
                reason: null,
                weight: 100,
            },
            {
                date: new Date(),
                reason: "This is the latest",
                weight: 200,
            },
        ]
    })
        .then(xlsx.create)
        .then(_.promise.make(sd => {
            console.log("+", "ok")
        }))
        .catch(error => {
            console.log("#", _.error.message(error))
            process.exit(1)
        })
} else if (!action_name) {
    console.log("#", "action required - should be one of:", actions.join(", "))
} else {
    console.log("#", "unknown action - should be one of:", actions.join(", "))
}
