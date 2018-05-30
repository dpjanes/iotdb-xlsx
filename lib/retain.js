/*
 *  lib/retain.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

const _ = require("iotdb-helpers")

const assert = require("assert")

/**
 *  Default values from a previous json if 
 *  they are not there
 */
const retain = keys => _.promise.make(self => {
    const method = "otherwise"

    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    assert.ok(_.is.Array.of.String(keys), `${method}: expected parameter to be Array of String`)

    let retained = null

    self.jsons = self.jsons.map(json => {
        if (retained === null) {
            retained = {}
            keys.forEach(key => {
                retained[key] = json[key]
            })
        }

        json = _.d.clone(json)

        keys.forEach(key => {
            if (json[key] === null) {
                json[key] = retained[key]
            } else {
                retained[key] = json[key]
            }
        })

        return json
    })
})

/**
 *  API
 */
exports.retain = retain
