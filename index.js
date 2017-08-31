import attach from "@unction/attach"
import fresh from "@unction/fresh"
import reduceWithValueKey from "@unction/reducewithvaluekey"

export default function mapValuesWithValueKey (unction: ValueType => KeyType => ValueType): Function {
  return function mapValuesWithValueKeyUnction (functor: FunctorType): FunctorType {
    return reduceWithValueKey(
      (accumulated: AccumulatedType): Function =>
        (value: ValueType): Function =>
          (key: KeyType): FunctorType =>
            attach(key)(unction(value)(key))(accumulated)
    )(
      fresh(functor)
    )(
      functor
    )
  }
}
