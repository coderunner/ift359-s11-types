function curry<A, B, C>(f: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => f(a, b);
}

function uncurry<A, B, C>(f: (a: A) => (b: B) => C): (a: A, b: B) => C {
  return (a: A, b: B) => f(a)(b);
}

function map<A, B>(a: readonly A[], f: (x: A) => B): B[] {
  return a.map(f);
}
