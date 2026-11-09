type ID<DataType> = string & { __marque: DataType };

type ClientId = ID<"client">;
type ProduitId = ID<"produit">;

function creerClientId(id: string): ClientId {
  return id as ClientId;
}

const c = creerClientId("id");
// Type 'ClientId' is not assignable to type 'ProduitId'.
//const p: ProduitId = c;

// on peut assigner le type spécifique au type de base
const idCommeString: string = c;
