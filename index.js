import mergeRight from "@unction/mergeright"
import fresh from "@unction/fresh"
import of from "@unction/of"
import reduceWithValueKey from "@unction/reducewithvaluekey"

export default function mapValuesWithValueKey (unction: ValueType => (KeyType | void) => ValueType): UnaryFunctionType {
  return function mapValuesWithValueKeyUnction (functor: FunctorType): FunctorType {
    if (functor.map instanceof Function) {
      return functor.map((value: ValueType, key: KeyType | void): ValueType => unction(value)(key))
    }

    return reduceWithValueKey(
      (accumulated: FunctorType): UnaryFunctionType =>
        (value: ValueType): UnaryFunctionType =>
          (key: (KeyType | void)): FunctorType => {
            return mergeRight(accumulated)(of(key)(unction(value)(key))(accumulated))
          }
    )(
      fresh(functor)
    )(
      functor
    )
  }
}
