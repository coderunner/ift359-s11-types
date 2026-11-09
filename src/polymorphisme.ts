function combiner(a: number, b: number): number;
function combiner(a: string, b: string): string;
function combiner(a: any, b: any): any {
  return a + b;
}

interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  timestamp: number;
}

function wrapResponse<T>(data: T): ApiResponse<T> {
  return {
    data: data,
    status: "success",
    timestamp: Date.now(),
  };
}

export interface Affichable<T> {
  readonly afficher: (valeur: T) => string;
}

export const affichableNombre: Affichable<number> = {
  afficher: (n) => `[Entier] ${n.toFixed(2)}`,
};

export function imprimer<T>(valeur: T, a: Affichable<T>): void {
  console.log(a.afficher(valeur));
}

imprimer(2, affichableNombre);
