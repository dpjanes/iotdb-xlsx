/*
 *  lib/otherwise.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

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
