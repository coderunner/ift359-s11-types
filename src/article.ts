// Article initial
export type ArticleBrouillon = {
  readonly titre: string;
  readonly contenu: string;
};

// Article vérifié (le titre est assaini et non vide)
export type ArticleValide = {
  readonly titre: string;
  readonly contenu: string;
  readonly slug: string; // identificateur bâti à partir du titre validé
};

// Article officiellement publié
export type ArticlePublie = {
  readonly titre: string;
  readonly contenu: string;
  readonly slug: string;
  readonly datePublication: Date;
};

import { none, Option, some } from "./option.js";
export function validerArticle(brouillon: ArticleBrouillon): Option<ArticleValide> {
  const titreNettoye = brouillon.titre.trim();

  if (titreNettoye.length === 0 || brouillon.contenu.length < 10) {
    return none; // Échec de validation normalisé
  }

  const slug = titreNettoye.toLowerCase().replace(/\s+/g, "-");

  return some({
    titre: titreNettoye,
    contenu: brouillon.contenu,
    slug,
  });
}

// La fonction 'publier' EXIGE un ArticleValide en entrée
export function publierArticle(article: ArticleValide, date: Date): ArticlePublie {
  // Aucun "if (!article.valide)" n'est nécessaire !
  // La signature prouve à 100% que l'article possède un slug et est valide.
  return {
    titre: article.titre,
    contenu: article.contenu,
    slug: article.slug,
    datePublication: date,
  };
}
