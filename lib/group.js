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
 *  Group values into sublists around a key
 */
const group = key => _.promise.make(self => {
    self.groups = []
    let group_rows
    let group_value

    self.rows.forEach(row => {
        const value = row[key]
        if (value !== group_value) {
            group_rows = null
        }

        if (!group_rows) {
            group_rows = []
            group_value = value
            
            self.groups.push(group_rows)
        }

        group_rows.push(row)
    })
})
