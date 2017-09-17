import attach from "@unction/attach"
import fresh from "@unction/fresh"
import reduceWithValueKey from "@unction/reducewithvaluekey"

export default function mapValuesWithValueKey (unction: ValueType => (ObjectKeyType | ArrayKeyType | MapKeyType | ArrayKeyType | null) => ValueType): Function {
  return function mapValuesWithValueKeyUnction (functor: ObjectType | ArrayType | MapType | StringType | SetType): ObjectType | ArrayType | MapType | StringType | SetType {
    return reduceWithValueKey(
      (accumulated: ObjectType | ArrayType | MapType | StringType | SetType): Function =>
        (value: ValueType): Function =>
          (key: (KeyType | null)): ObjectType | ArrayType | MapType | StringType | SetType =>
            attach(key)(unction(value)(key))(accumulated)
    )(
      fresh(functor)
    )(
      functor
    )
  }
}
