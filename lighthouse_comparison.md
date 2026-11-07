# Comparatif Lighthouse – HRnet (jQuery vs React)

Audit de la page **Create Employee** des deux versions de HRnet, pour vérifier que la conversion vers React améliore bien les performances.

## Conditions de test

| | Version jQuery | Version React |
| :--- | :--- | :--- |
| URL | `http://localhost:3000/` (fichiers statiques du repo d'origine) | `http://localhost:4173/` (**build de production** : `npm run build` + `npm run preview`) |
| Outil | Lighthouse 13.5.0 (Chrome DevTools) | Lighthouse 13.5.0 (Chrome DevTools) |
| Appareil | Mobile émulé (Moto G Power) | Mobile émulé (Moto G Power) |
| Réseau | Slow 4G simulé | Slow 4G simulé |
| Date | 07/11/2026 | 07/11/2026 |

Le mode **mobile** a été choisi volontairement : il simule un processeur et un réseau lents. En desktop, une application aussi légère obtient 100 en performance quelle que soit la technologie, ce qui ne permet pas de comparer. Le mobile fait apparaître les écarts réels de chargement.

## Scores

| Catégorie | jQuery | React | Écart |
| :--- | :---: | :---: | :---: |
| **Performance** | 85 | **100** | **+15** |
| **Accessibilité** | 89 | **91** | +2 |
| **Bonnes pratiques** | 92 | **96** | +4 |
| **SEO** | 90 | **91** | +1 |

React progresse dans les **4 catégories**.

## Métriques de chargement

| Métrique | jQuery | React | Gain |
| :--- | :---: | :---: | :---: |
| First Contentful Paint (premier affichage) | 2,5 s | **1,5 s** | −1,0 s (−40 %) |
| Largest Contentful Paint (affichage du contenu principal) | 2,6 s | **1,5 s** | −1,1 s (−42 %) |
| Speed Index (vitesse d'affichage visuel) | 9,8 s | **1,5 s** | −8,3 s (**−85 %**) |
| Total Blocking Time (blocage du thread principal) | 20 ms | **0 ms** | −20 ms |
| Cumulative Layout Shift (décalages visuels) | 0 | 0 | = |

## Appels réseau

| | jQuery | React |
| :--- | :---: | :---: |
| Fichiers JavaScript | 5 (jQuery, jQuery UI, jquery.modal, datetimepicker, app.js) | **1** (bundle Vite) |
| Fichiers CSS | 4 | **1** |
| Domaines tiers (CDN) | 3 (googleapis, cdnjs, code.jquery.com) | **0** |
| Requêtes bloquant le rendu (gain estimé par Lighthouse) | 1 850 ms | **300 ms** |

## Analyse

### Performance (85 → 100)
C'est le gain principal. Dans la version jQuery, les **5 scripts sont chargés dans le `<head>` sans `defer`** : le navigateur doit télécharger et exécuter jQuery, jQuery UI et les plugins avant d'afficher quoi que ce soit. Lighthouse estime à **1,85 s** le temps perdu par ces requêtes bloquantes. Trois d'entre elles viennent de CDN externes, ce qui ajoute des connexions réseau supplémentaires.

La version React n'envoie qu'**un seul fichier JavaScript et un seul fichier CSS**, minifiés par Vite, servis depuis le même domaine. Le script est un module ES, donc différé par défaut. Résultat : le **Speed Index passe de 9,8 s à 1,5 s**, et l'affichage du contenu principal est 42 % plus rapide.

Lighthouse signalait aussi pour jQuery du JavaScript non minifié (21 KiB, notamment `jquery-ui.js`) et du « JavaScript legacy » : ces problèmes disparaissent avec le build Vite.

### Accessibilité (89 → 91)
- Corrigé : la balise `<html>` a maintenant un attribut `lang`, et les menus déroulants n'ont plus le problème des listes jQuery UI (`selectmenu`), qui n'avaient pas de nom accessible. Ce sont maintenant de vrais `<select>` reliés à leur `<label>`.
- Reste à corriger dans les deux versions : l'absence de balise `<main>`.
- Nouveau point React : le champ du sélecteur de date utilise `aria-expanded` sans le rôle qui l'autorise.

### Bonnes pratiques (92 → 96)
- Corrigé : la version jQuery n'avait pas de `<!doctype html>` (mode « quirks ») et affichait des erreurs dans la console. La version React n'en a plus.
- Restant : un avertissement sur la déclaration du charset, alors que `<meta charset="UTF-8">` est bien la première balise du `<head>`. Il vient probablement du serveur de preview de Vite. Les points « Trust and Safety » (CSP, HSTS…) dépendent de la configuration du serveur de production, pas de l'application.

### SEO (90 → 91)
- Corrigé : la version React a une meta description.
- Restant : l'absence de fichier `robots.txt`. Le serveur de preview renvoie alors la page HTML à la place, que Lighthouse lit comme un `robots.txt` invalide. Pour une application interne, le référencement n'est de toute façon pas un enjeu.

## Conclusion

Sur un mobile simulé avec un réseau lent, la version React est **nettement plus rapide** : score de performance de 85 à 100, contenu principal affiché 1,1 s plus tôt, Speed Index divisé par 6.

Le gain vient surtout de la **suppression de jQuery et de ses plugins**, chargés de manière bloquante depuis plusieurs CDN, remplacés par un bundle unique, minifié et optimisé par Vite. Les autres catégories progressent aussi.

## Rapports complets

- Version jQuery : [lighthouse-jquery.pdf](./lighthouse-jquery.pdf)
- Version React : [lighthouse-react.pdf](./lighthouse-react.pdf)
