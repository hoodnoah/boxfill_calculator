export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }

export function wrap<T, E = Error>(value: T): Result<T, E> {
  return { ok: true, value }
}

export function wrapError<T, E = Error>(error: E): Result<T, E> {
  return { ok: false, error }
}

export function bind<T, U, E = Error>(
  result: Result<T, E>,
  f: (value: T) => Result<U, E>
): Result<U, E> {
  if (result.ok) {
    return f(result.value)
  } else {
    return result
  }
}

export function unwrapOrThrow<T, E = Error>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value
  } else {
    throw result.error
  }
}
