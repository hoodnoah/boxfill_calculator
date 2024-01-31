export namespace Option {
  interface None {
    readonly _tag: 'None'
  }

  interface Some<T> {
    readonly _tag: 'Some'
    readonly value: T
  }

  export type Option<T> = None | Some<T>

  export function None<T>(): Option<T> {
    return { _tag: 'None' }
  }

  export function Some<T>(value: T): Option<T> {
    return { _tag: 'Some', value }
  }

  export function bind<T, U>(option: Option<T>, f: (value: T) => Option<U>): Option<U> {
    switch (option._tag) {
      case 'None':
        return None<U>()
      case 'Some':
        return f(option.value)
    }
  }

  export function map<T, U>(option: Option<T>, f: (value: T) => U): Option<U> {
    return bind(option, (value) => Some(f(value)))
  }

  export function getOrDefault<T>(option: Option<T>, defaultValue: T): T {
    switch (option._tag) {
      case 'None':
        return defaultValue
      case 'Some':
        return option.value
    }
  }

  export function isSome<T>(option: Option<T>): boolean {
    return (option as Some<T>)._tag === 'Some'
  }

  export function isNone<T>(option: Option<T>): boolean {
    return (option as None)._tag === 'None'
  }
}
