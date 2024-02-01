import { Option } from './Option'

export namespace FP_Utility {
  type Comparator<T> = (a: T, b: T) => boolean

  export function tryFindIndex<T>(
    array: T[],
    value: T,
    comparator: Comparator<T>
  ): Option.Option<number> {
    const searchResult = array.findIndex((x) => comparator(value, x))

    return searchResult === undefined ? Option.None() : Option.Some(searchResult)
  }
}
