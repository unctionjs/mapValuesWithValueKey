import mergeRight from "@unction/mergeright";
import fresh from "@unction/fresh";
import of from "@unction/of";
import reduceWithValueKey from "@unction/reducewithvaluekey";
import {MapperFunctionType} from "./types";
import {KeyedEnumerableType} from "./types";

export default function mapValuesWithValueKey<A, B, C> (unction: MapperFunctionType<A, MapperFunctionType<B, C>>) {
  return function mapValuesWithValueKeyUnction (enumerable: KeyedEnumerableType<B, A>): KeyedEnumerableType<B, C> {
    if ("map" in enumerable && typeof enumerable.map === "function") {
      return enumerable.map((value: A, key: B) => unction(value)(key));
    }

    return reduceWithValueKey((accumulated: KeyedEnumerableType<B, A>) => (value: A) => (key: B): KeyedEnumerableType<B, C> => {
      return mergeRight(accumulated)(of(key)(unction(value)(key))(accumulated));
    })(
      fresh(enumerable)
    )(
      enumerable
    );
  };
}
