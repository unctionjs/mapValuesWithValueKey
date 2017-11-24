import attach from "@unction/attach"
import fresh from "@unction/fresh"
import reduceWithValueKey from "@unction/reducewithvaluekey"

export default function mapValuesWithValueKey (unction: ValueType => (KeyType | null) => ValueType): UnaryFunctionType {
  return function mapValuesWithValueKeyUnction (functor: FunctorType): FunctorType {
    return reduceWithValueKey(
      (accumulated: FunctorType | StreamType): UnaryFunctionType =>
        (value: ValueType): UnaryFunctionType =>
          (key: (KeyType | null)): FunctorType =>
            attach(key)(unction(value)(key))(accumulated)
    )(
      fresh(functor)
    )(
      functor
    )
  }
}
