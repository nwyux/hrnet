# Comparatif Lighthouse – HRnet (jQuery vs React)

Audit Lighthouse de la page **Create Employee**, en mode mobile, sur l'ancienne version jQuery et sur le build de production de la version React.

## Scores

| Catégorie | jQuery | React |
| :--- | :---: | :---: |
| **Performance** | 85 | **100** |
| **Accessibilité** | 89 | **91** |
| **Bonnes pratiques** | 92 | **96** |
| **SEO** | 90 | **91** |

## Temps de chargement

| Métrique | jQuery | React |
| :--- | :---: | :---: |
| Premier affichage (FCP) | 2,5 s | **1,5 s** |
| Affichage du contenu principal (LCP) | 2,6 s | **1,5 s** |
| Speed Index | 9,8 s | **1,5 s** |

## Explications

- **Performance** : la version jQuery charge jQuery, jQuery UI et plusieurs plugins depuis des CDN, ce qui bloque l'affichage de la page. La version React n'envoie qu'un seul fichier JavaScript, minifié et optimisé par Vite, d'où un chargement nettement plus rapide.
- **Accessibilité** : ajout de l'attribut `lang` sur la page, et les menus déroulants sont de vrais `<select>` reliés à leur libellé.
- **Bonnes pratiques** : la page a maintenant un doctype et n'affiche plus d'erreurs dans la console.
- **SEO** : ajout d'une meta description.

## Conclusion

La conversion en React améliore les **4 catégories**, et surtout la performance (85 → 100), avec un contenu affiché environ **1 seconde plus tôt**.

## Rapports complets

- Version jQuery : [lighthouse-jquery.pdf](./lighthouse-jquery.pdf)
- Version React : [lighthouse-react.pdf](./lighthouse-react.pdf)
