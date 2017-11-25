/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"
import xstream from "xstream"
import streamSatisfies from "@unction/streamsatisfies"

import mapValuesWithValueKey from "./index"

test("Array", ({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(["a", "b", "c"]),
    ["a:0", "b:1", "c:2"]
  )
  end()
})

test("Object", ({same, end}) => {
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

test("Map", ({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(new Map([["0", "a"], ["1", "b"], ["2", "c"]])),
    new Map([["0", "a:0"], ["1", "b:1"], ["2", "c:2"]])
  )
  end()
})

test("Set", ({same, end}) => {
  same(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(new Set(["a", "b", "c"])),
    new Set(["a:", "b:", "c:"])
  )
  end()
})

test("String", ({equal, end}) => {
  equal(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)("abc"),
    "a:0b:1c:2"
  )
  end()
})

test("Stream", ({same, end}) => {
  streamSatisfies(
    "['a', null]---|"
  )(
    (given) => (expected) => same(given, expected)
  )(
    () => () => end()
  )(
    mapValuesWithValueKey(
      (value) =>
        (index) =>
          [value, index]
    )(
      xstream.of("a")
    ),
  )
})

test("MemoryStream", ({same, end}) => {
  streamSatisfies(
    "['a', null]---['b', null]---['c', null]---|"
  )(
    (given) => (expected) => same(given, expected)
  )(
    () => () => end()
  )(
    mapValuesWithValueKey(
      (value) =>
        (index) =>
          [value, index]
    )(
      xstream.fromArray(["a", "b", "c"])
    ),
  )
})
