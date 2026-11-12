# Comparatif Lighthouse – HRnet (jQuery vs React)

Audit Lighthouse de la page **Create Employee**, en mode mobile, sur l'ancienne version jQuery et sur le build de production de la version React.

## Scores

| Catégorie | jQuery | React |
| :--- | :---: | :---: |
| **Performance** | 94 | **100** |
| **Accessibilité** | 89 | **91** |
| **Bonnes pratiques** | 92 | **96** |
| **SEO** | 90 | **91** |

## Temps de chargement

| Métrique | jQuery | React |
| :--- | :---: | :---: |
| Premier affichage (FCP) | 2,5 s | **1,5 s** |
| Affichage du contenu principal (LCP) | 2,5 s | **1,5 s** |
| Speed Index | 2,5 s | **1,5 s** |

## Appels réseau

| | jQuery | React |
| :--- | :---: | :---: |
| Nombre de requêtes | 12 | **4** |
| Poids total transféré | 200 Ko | **105 Ko** |
| Fichiers JavaScript | 5 | **1** |
| Fichiers CSS | 4 | **1** |
| Requêtes vers des serveurs externes (CDN) | 6 | **0** |

## Explications

- **Performance** : la version jQuery charge jQuery, jQuery UI et plusieurs plugins depuis des CDN, ce qui bloque l'affichage de la page. La version React n'envoie qu'un seul fichier JavaScript, minifié et optimisé par Vite, d'où un chargement nettement plus rapide.
- **Accessibilité** : ajout de l'attribut `lang` sur la page, et les menus déroulants sont de vrais `<select>` reliés à leur libellé.
- **Bonnes pratiques** : la page a maintenant un doctype et n'affiche plus d'erreurs dans la console.
- **SEO** : ajout d'une meta description.

## Conclusion

La conversion en React améliore les **4 catégories**. La page s'affiche **1 seconde plus tôt**, avec **3 fois moins de requêtes** et un poids **divisé par 2**.

## Rapports complets

- Version jQuery : [lighthouse-jquery.json](./lighthouse-jquery.json) · [PDF](./lighthouse-jquery.pdf)
- Version React : [lighthouse-react.json](./lighthouse-react.json) · [PDF](./lighthouse-react.pdf)

Les fichiers JSON peuvent être ouverts dans le [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/) pour retrouver le rapport complet.
