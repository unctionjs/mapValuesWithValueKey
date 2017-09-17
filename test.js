/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"

import mapValuesWithValueKey from "./index"

test(({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(["a", "b", "c"]),
    ["a:0", "b:1", "c:2"]
  )
  end()
})

test(({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)({
      aaa: "a",
      bbb: "b",
      ccc: "c",
    }),
    {
      aaa: "a:aaa",
      bbb: "b:bbb",
      ccc: "c:ccc",
    }
  )
  end()
})

test(({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(new Map([["0", "a"], ["1", "b"], ["2", "c"]])),
    new Map([["0", "a:0"], ["1", "b:1"], ["2", "c:2"]])
  )
  end()
})

test(({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(new Set(["a", "b", "c"])),
    new Set(["a:", "b:", "c:"])
  )
  end()
})

test(({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)("abc"),
    "abc:2:1:0"
  )
  end()
})
