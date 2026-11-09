import { deuxieme, Paire, paire, premier } from "./paire-fermee.js";

const p1: Paire<number, number> = paire(1, 2);
const a1 = premier(p1);

const p2 = { _1: 1, _2: 2 };
// Argument of type '{ _1: number; _2: number; }' is not assignable to parameter of type 'Paire<unknown, unknown>'.
// Property '[PaireMarque]' is missing in type '{ _1: number; _2: number; }' but required in type 'Paire<unknown, unknown>'.
const a2 = premier(p2);

function inverse<A, B>(p: Paire<A, B>): Paire<B, A> {
  return paire(deuxieme(p), premier(p));
}

console.log(inverse(p1)); // { _1: 2, _2: 1 }
