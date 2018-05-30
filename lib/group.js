/*
 *  lib/group.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

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
