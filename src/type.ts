interface ClientId {
  getValeur(): string;
}

interface ProduitId {
  getValeur(): string;
}

const client: ClientId = { getValeur: () => "C-123" };

// Valide en TypeScript !
const produit: ProduitId = client;

const a = () => {};

type Prop1 = <A>(a: A) => A;

const preuveProp1: Prop1 = <A>(a: A): A => {
  return a;
};

type Prop2 = <A, B>(a: A) => B;

// const preuveProp2: Prop2 = <A, B>(a: A): B => {
//   // ¯\_(ツ)_/¯
// };
