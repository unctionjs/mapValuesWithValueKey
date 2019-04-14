import mergeRight from "@unction/mergeright";
import fresh from "@unction/fresh";
import of from "@unction/of";
import reduceWithValueKey from "@unction/reducewithvaluekey";
export default function mapValuesWithValueKey (unction) {
  return function mapValuesWithValueKeyUnction (functor) {
    if (functor.map instanceof Function) {
      return functor.map((value, key) => unction(value)(key));
    }

    return reduceWithValueKey((accumulated) => (value) => (key) => {
      return mergeRight(accumulated)(of(key)(unction(value)(key))(accumulated));
    })(fresh(functor))(functor);
  };
}
