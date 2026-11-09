// symbol est un identifiant mémoire ; 'unique symbol' lui confère en plus un type exclusif.
// Un symbol peut servir de clé d'objet, mais cette clé est masquée et omise par JSON.stringify.
// declare indique au compilateur que l'identifiant existe.
declare const PaireMarque: unique symbol;

interface PaireInterne<A, B> {
  readonly _1: A;
  readonly _2: B;
}

export interface Paire<A, B> {
  // Pour le monde extérieur, Paire contient un champ dont le nom est un symbole privé invisible.
  // Ce champ utilise le tuple fantôme [A, B] pour lier les types génériques,
  // mais aucun objet concret n'a cette propriété.
  readonly [PaireMarque]: [A, B];
}

export function paire<A, B>(premier: A, deuxieme: B): Paire<A, B> {
  const interne: PaireInterne<A, B> = { _1: premier, _2: deuxieme };
  return interne as unknown as Paire<A, B>;
}

export function premier<A, B>(p: Paire<A, B>): A {
  return (p as unknown as PaireInterne<A, B>)._1;
}

export function deuxieme<A, B>(p: Paire<A, B>): B {
  return (p as unknown as PaireInterne<A, B>)._2;
}
