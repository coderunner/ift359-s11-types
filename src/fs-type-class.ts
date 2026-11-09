// Types Produits
export interface FichierTexte {
  readonly type: "texte";
  readonly nom: string;
  readonly contenu: string;
}

export interface FichierBinaire {
  readonly type: "binaire";
  readonly nom: string;
  readonly tailleOctets: number;
}

export interface Repertoire {
  readonly type: "repertoire";
  readonly nom: string;
  readonly enfants: readonly ElementFS[];
}

export interface LienSymbolique {
  readonly type: "lien";
  readonly nom: string;
  readonly cible: string;
}

export interface LienCloud {
  readonly type: "cloud";
  readonly nom: string;
  readonly url: string;
}

// Type Somme
export type ElementFS = FichierTexte | FichierBinaire | Repertoire | LienSymbolique | LienCloud;

export function fichierTexte(nom: string, contenu: string): FichierTexte {
  return { type: "texte", nom, contenu };
}

export function fichierBinaire(nom: string, tailleOctets: number): FichierBinaire {
  return { type: "binaire", nom, tailleOctets };
}

export function repertoire(nom: string, enfants: ElementFS[]): Repertoire {
  return { type: "repertoire", nom, enfants };
}

export function lienSymbolique(nom: string, cible: string): LienSymbolique {
  return { type: "lien", nom, cible };
}

export function enfants(e: Repertoire): readonly ElementFS[] {
  return e.enfants;
}

export function tailleOctets(e: FichierBinaire): number {
  return e.tailleOctets;
}

export function contenu(e: FichierTexte): string {
  return e.contenu;
}

export function estFichierTexte(e: ElementFS): e is FichierTexte {
  return e.type === "texte";
}

export function estFichierBinaire(e: ElementFS): e is FichierBinaire {
  return e.type === "binaire";
}

export function estRepertoire(e: ElementFS): e is Repertoire {
  return e.type === "repertoire";
}

export function estLienSymbolique(e: ElementFS): e is LienSymbolique {
  return e.type === "lien";
}

// Table d'indexation calculée sur les discriminants
type TableElements = {
  readonly [E in ElementFS as E["type"]]: E;
};

// La classe de type (le contrat)
interface Mesurable<T extends ElementFS> {
  taille(e: T): number;
}

// Registre exhaustif. Un RegistreMesurable doit contenir une entrée pour chaque type.
// Ex 'texte' => Mesurable<FichierTexte>
export type RegistreMesurable = {
  readonly [K in keyof TableElements]: Mesurable<TableElements[K]>;
};

// Implémentation par type
export const mesurableTexte: Mesurable<FichierTexte> = {
  taille: (f) => f.contenu.length,
};

export const mesurableBinaire: Mesurable<FichierBinaire> = {
  taille: (f) => f.tailleOctets,
};

export const mesurableLien: Mesurable<LienSymbolique> = {
  taille: () => 0,
};

export const mesurableRepertoire: Mesurable<Repertoire> = {
  taille: (r) => r.enfants.reduce((acc, enf) => acc + taille(enf), 0),
};

export const mesurableLienCloud: Mesurable<LienCloud> = {
  taille: () => 0,
};

// Registre de toutes les implémentations
export const registreMesurable: RegistreMesurable = {
  texte: mesurableTexte,
  binaire: mesurableBinaire,
  lien: mesurableLien,
  repertoire: mesurableRepertoire,
  cloud: mesurableLienCloud,
};

// Opération. Pas besoin de modifier ce code si on ajoute un nouveau type.
export function taille(e: ElementFS): number {
  const instance: Mesurable<any> = registreMesurable[e.type];
  return instance.taille(e);
}
