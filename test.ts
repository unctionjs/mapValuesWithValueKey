
import {of} from "most";
import streamSatisfies from "@unction/streamsatisfies";

import mapValuesWithValueKey from "./index.ts";

test("Array", () => {
  expect(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(["a", "b", "c"])
  ).toEqual(["a:0", "b:1", "c:2"]);
});

test("Object", () => {
  expect(mapValuesWithValueKey((value) => (index) => `${value}:${index}`)({
    aaa: "a",
    bbb: "b",
    ccc: "c",
  })).toEqual({
    aaa: "a:aaa",
    bbb: "b:bbb",
    ccc: "c:ccc",
  });
});

test("Set", () => {
  expect(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(new Set(["a", "b", "c"]))
  ).toEqual(new Set(["a:undefined", "b:undefined", "c:undefined"]));
});

test("Map", () => {
  expect(
    mapValuesWithValueKey((value) => (index) => `${value}:${index}`)(new Map([["0", "a"], ["1", "b"], ["2", "c"]]))
  ).toEqual(new Map([["0", "a:0"], ["1", "b:1"], ["2", "c:2"]]));
});

test("String", () => {
  expect(mapValuesWithValueKey((value) => (index) => `${value}:${index}`)("abc")).toBe("a:0b:1c:2");
});

test("Stream", done => {
  streamSatisfies(
    [
      ["a", null],
    ]
  )(
    (given) => (expected) => expect(given).toEqual(expected)
  )(
    doesNotThrow
  )(
    ({length}) =>
      (position) => {
        expect(length).toBe(position);
        done();
      }
  )(
    mapValuesWithValueKey(
      (value) =>
        (index) =>
          [value, index]
    )(
      of("a")
    ),
  );
});
