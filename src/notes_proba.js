// Explication de CHAQUE proposition pour les questions du prof (même ordre que l'écran Moodle)
Object.assign(NOTES, {
'QCM Proba 0 · Q1': [
 "Faux : ça, c'est une probabilité (un nombre). Un événement est un ensemble ; c'est P qui lui associe un nombre.",
 "Faux : une fonction définie sur Ω, c'est une variable aléatoire, pas un événement.",
 "Faux : un élément ω de Ω est un résultat. L'événement correspondant serait le singleton {ω}.",
 "Vrai : un événement est une partie de Ω (un ensemble de résultats), qui doit appartenir à la tribu pour qu'on puisse calculer sa probabilité."],
'QCM Proba 0 · Q2': [
 "Vrai : ce sont exactement les 3 axiomes du cours (Ω ∈ T, complémentaire, union dénombrable).",
 "Faux : l'union finie ne suffit pas, il faut l'union dénombrable (infinie). Et c'est Ω (pas seulement ∅) qui est dans les axiomes.",
 "Faux : la stabilité par complémentaire est obligatoire.",
 "Faux : l'ensemble des singletons ne contient en général ni ∅ ni Ω, et n'est pas stable par union."],
'QCM Proba 0 · Q3': [
 "Vrai : c'est la définition d'une probabilité (positivité, P(Ω) = 1, σ-additivité).",
 "Faux : une probabilité est entre 0 et 1, jamais négative, et P(Ω) = 1, pas 0.",
 "Faux : cette égalité n'est vraie que pour des événements indépendants, pas pour tous.",
 "Faux : P(∅) = 0, pas 1. Et P(A ∪ B) = P(A) + P(B) seulement si A et B sont disjoints."],
'QCM Proba 0 · Q4': [
 "Faux : une mesure de probabilité sur ℝ, c'est la loi de X (P_X), pas X elle-même.",
 "Faux : X n'a besoin d'être ni croissante ni bijective, et elle part de Ω, pas de ℝ.",
 "Vrai : X est une fonction de Ω dans ℝ, mesurable, c'est-à-dire que (X ∈ I) est un événement pour tout intervalle I.",
 "Faux : malgré son nom, une v.a. ne « change » pas dans le temps. C'est une fonction fixe du résultat de l'expérience."],
'QCM Proba 0 · Q5': [
 "Faux : ce n'est pas la définition.",
 "Faux : on divise par P(B), la condition, pas par P(A). Ceci serait P(B|A).",
 "Vrai : P(A|B) = P(A ∩ B) / P(B). Dans « A sachant B », on divise par ce qu'on sait : B.",
 "Faux : P(A)P(B) correspond à P(A ∩ B) dans le cas indépendant, pas à une probabilité conditionnelle."],
'QCM Proba 0 · Q6': [
 "Vrai : c'est la définition de l'indépendance.",
 "Faux : c'est le contraire. Disjoints avec des probabilités non nulles ⇒ P(A∩B) = 0 ≠ P(A)P(B), donc dépendants.",
 "Faux : incompatible et indépendant sont deux notions différentes (et presque opposées).",
 "Faux : la bonne caractérisation est P(A|B) = P(A), pas P(A|B) = P(B|A)."],
'QCM Proba 0 · Q9': [
 "Faux : la linéarité de l'espérance ne demande PAS l'indépendance.",
 "Faux : c'est la variance qui fait apparaître a². Ici E(aX + b) = aE(X) + b.",
 "Faux : E(XY) = E(X)E(Y) demande que X et Y soient indépendantes.",
 "Vrai : l'espérance est linéaire, toujours, sans condition."],
'QCM Proba 0 · Q10': [
 "Faux : il manque le carré sur E(X), et une variance n'est jamais négative.",
 "Vrai : moyenne des écarts au carré, donc ≥ 0, et nulle seulement si X ne varie pas (constante p.s.).",
 "Faux : c'est l'inverse (E(X²) − E(X)²). Cette formule donnerait un nombre ≤ 0.",
 "Faux : Var(X) = 0 veut dire X constante, ce qui n'a rien à voir avec une loi normale."],
'QCM Proba 0 · Q11': [
 "Faux : la constante b ne change pas la dispersion, elle disparaît. Pas de b².",
 "Faux : a doit être au carré et b disparaît.",
 "Faux : il manque le carré sur a.",
 "Vrai : Var(aX + b) = a² Var(X)."],
'QCM Proba 0 · Q12': [
 "Vrai : formule générale, valable même si X et Y sont liées.",
 "Faux : si X et Y sont corrélées, il faut le terme 2cov(X,Y).",
 "Faux : aucune formule de ce type.",
 "Faux : le signe moins correspond à Var(X − Y), pas Var(X + Y)."],
'QCM Proba 0 · Q13': [
 "Vrai : définition, et sa forme développée.",
 "Faux : c'est le produit E(X)E(Y) qu'on retire, pas la somme.",
 "Faux : la covariance n'est pas le produit des variances.",
 "Faux : formule inventée."],
'QCM Proba 0 · Q14': [
 "Vrai : indépendance ⇒ cov = 0, mais la réciproque est fausse (ex. Y = X² avec X symétrique).",
 "Faux : il n'y a pas équivalence en général.",
 "Faux : des variables indépendantes ont une covariance nulle, pas égale à 1.",
 "Faux : c'est la réciproque, qui est fausse."],
'QCM Proba 0 · Q15': [
 "Faux : on divise par le produit des écarts-types (pas des variances), et ρ peut être négatif.",
 "Faux : ρ est toujours borné entre −1 et 1.",
 "Vrai : ρ = cov / (σ_X σ_Y) ∈ [−1, 1].",
 "Faux : ρ = 0 veut dire non corrélées (pas de lien linéaire), pas forcément indépendantes."],
'QCM Proba 0 · Q16': [
 "Vrai : |ρ| = 1 ⇔ les valeurs sont parfaitement alignées sur une droite : Y = aX + b.",
 "Faux : c'est l'inverse, le lien est maximal.",
 "Faux : Y = 2X + 3 n'a pas la même loi que X, et pourtant |ρ| = 1.",
 "Faux : corrélation n'est pas causalité."],
'QCM Proba 0 · Q17': [
 "Vrai : système complet = partition : deux à deux disjoints et réunion égale à Ω.",
 "Faux : c'est la réunion qui doit valoir Ω, pas l'intersection (qui est vide).",
 "Faux : la somme de leurs probabilités vaut 1.",
 "Faux : ils sont disjoints (donc dépendants), et pas forcément de même probabilité."],
'QCM Proba 0 · Q18': [
 "Faux : formule inventée.",
 "Faux : on additionne, on ne multiplie pas.",
 "Faux : les conditionnements sont à l'envers. C'est P(B|Aᵢ), et il manque P(Aᵢ).",
 "Vrai : on découpe selon chaque cas Aᵢ : P(B) = Σ P(B|Aᵢ) P(Aᵢ)."],
'QCM Proba 0 · Q19': [
 "Faux : c'est la définition de P(B|A), pas de P(A|B).",
 "Faux : on multiplie par P(A) et on divise par P(B).",
 "Faux : P(A|B) apparaît des deux côtés, la formule tourne en rond.",
 "Vrai : formule de Bayes, elle inverse le conditionnement."],
'QCM Proba 0 · Q20': [
 "Vrai : a priori = avant l'observation, a posteriori = après avoir vu B.",
 "Faux : l'observation B modifie justement la probabilité (sauf indépendance).",
 "Faux : c'est inversé.",
 "Faux : la vraisemblance est P(B|Aₖ). P(Aₖ|B) dépend bien de P(Aₖ)."],

'QCM Proba 1 · Q1': [
 "Faux : pour une v.a. discrète, F est en escalier : ni strictement croissante, ni dérivable partout.",
 "Faux : F prend toutes les valeurs intermédiaires possibles entre 0 et 1.",
 "Vrai : croissante, limite 0 en −∞ et 1 en +∞.",
 "Faux : F ne décroît jamais."],
'QCM Proba 1 · Q2': [
 "Faux : on divise par l'écart-type σ, pas par la variance σ².",
 "Vrai : on centre (− μ) puis on réduit (÷ σ).",
 "Faux : il faut soustraire μ, pas multiplier.",
 "Faux : μ et σ sont inversés."],
'QCM Proba 1 · Q3': [
 "Faux : « mutable » est du vocabulaire informatique, sans rapport.",
 "Faux : une v.a. discrète peut prendre des valeurs négatives ou nulles.",
 "Faux : ça décrit une variable continue.",
 "Vrai : discrète = ensemble de valeurs fini ou dénombrable."],
'QCM Proba 1 · Q4': [
 "Faux : seulement la moitié de la masse est à gauche de μ.",
 "Faux : X est continue, donc P(X = μ) = 0.",
 "Faux : P(X ≥ μ) = 0,5.",
 "Vrai : par symétrie, la moitié à gauche, la moitié à droite."],
'QCM Proba 1 · Q5': [
 "Vrai : E(X) = 1 × p + 0 × (1−p) = p.",
 "Faux : ce serait le cas seulement si p = 1.",
 "Faux : 1 − p est la probabilité d'échec.",
 "Faux : p(1−p) est la variance."],
'QCM Proba 1 · Q6': [
 "Faux : x est la valeur, pas sa probabilité.",
 "Vrai : c'est la probabilité que X vaille exactement x.",
 "Faux : aucun sens.",
 "Faux : « inférieure à x », c'est la fonction de répartition F(x).",
 "Faux : on parle de densité pour une variable continue, pas discrète."],
'QCM Proba 1 · Q7': [
 "Faux : c'est la probabilité d'un seul échec.",
 "Faux : 0,5³, ce serait 3 échecs.",
 "Faux : 0,5², ce serait 2 échecs.",
 "Vrai : 4 échecs de suite : 0,5⁴ = 0,0625."],
'QCM Proba 1 · Q8': [
 "Vrai : « moyenne des carrés moins carré de la moyenne ».",
 "Faux : c'est un moins.",
 "Faux : il manque le carré et c'est dans le mauvais sens.",
 "Faux : l'ordre est inversé, ça donnerait un nombre négatif."],
'QCM Proba 1 · Q9': [
 "Faux : p² est E(X)², pas la variance.",
 "Vrai : Var = E(X²) − E(X)² = p − p² = p(1−p).",
 "Faux : p est l'espérance.",
 "Faux : 1 − p est la probabilité d'échec."],
'QCM Proba 1 · Q10': [
 "Faux : on parle d'une probabilité, pas d'une espérance.",
 "Faux : c'est la fonction de survie 1 − F, pas F.",
 "Vrai : la probabilité d'être en dessous de x (le cours écrit P(X < x), le prof écrit P(X ≤ x)).",
 "Faux : c'est la loi en un point (cas discret)."],
'QCM Proba 1 · Q11': [
 "Faux : aucun sens.",
 "Faux : c'est la longueur de l'intervalle.",
 "Vrai : le milieu de l'intervalle.",
 "Faux : c'est la variance."],
'QCM Proba 1 · Q12': [
 "Faux : c'est seulement P(X = 1).",
 "Vrai : P(X=1) + P(X=2) = 0,5 + 0,3 = 0,8.",
 "Faux : c'est seulement P(X = 2).",
 "Faux : c'est P(X ≤ 1) = 0,2 + 0,5."],
'QCM Proba 1 · Q13': [
 "Vrai : P(X > t) = 1 − F(t) = e^(−λt).",
 "Faux : c'est la densité f(t).",
 "Faux : λ est mal placé.",
 "Faux : c'est F(t) = P(X ≤ t), le contraire."],
'QCM Proba 1 · Q14': [
 "Vrai : E = np, Var = np(1−p).",
 "Faux : p est l'espérance d'une seule Bernoulli.",
 "Faux : c'est inversé.",
 "Faux : formules inventées."],
'QCM Proba 1 · Q15': [
 "Faux : E = λ, c'est pour Poisson.",
 "Faux : X est positive, sa moyenne ne peut pas être 0.",
 "Vrai : E(X) = 1/λ.",
 "Faux : aucune raison."],
'QCM Proba 1 · Q16': [
 "Faux : ce devrait être P(X > t).",
 "Faux : on ne peut pas additionner ces probabilités.",
 "Faux : c'est P(X > t) à droite, pas P(X > s).",
 "Vrai : ayant déjà duré s, la probabilité de durer t de plus est la même qu'au départ."],
'QCM Proba 1 · Q17': [
 "Vrai : on compte des occurrences sur un intervalle de temps, à taux moyen λ connu.",
 "Faux : ça, c'est Bernoulli.",
 "Faux : ça décrit la loi normale centrée (continue). Poisson est discrète.",
 "Faux : une durée n'est jamais négative, et Poisson compte, elle ne mesure pas une durée."],
'QCM Proba 1 · Q18': [
 "Faux : c'est la probabilité de tout l'intervalle [0 ; 2].",
 "Vrai : longueur 1 sur longueur totale 2 = 0,5.",
 "Faux : erreur de calcul.",
 "Faux : erreur de calcul."],
'QCM Proba 1 · Q19': [
 "Faux : 3 est la valeur la plus fréquente, pas la moyenne.",
 "Faux : erreur de calcul.",
 "Faux : c'est la moyenne non pondérée de 1 et 3.",
 "Vrai : 1 × 0,25 + 3 × 0,75 = 2,5."],
'QCM Proba 1 · Q20': [
 "Faux : une durée continue, c'est la loi exponentielle.",
 "Faux : n est fixé et les succès sont aléatoires.",
 "Vrai : n fixé, essais indépendants, même probabilité p.",
 "Faux : c'est exactement le contraire des conditions."],
'QCM Proba 1 · Q21': [
 "Faux : une densité est ≥ 0 et son intégrale vaut 1.",
 "Faux : f peut dépasser 1, et c'est une intégrale, pas une somme.",
 "Faux : f n'a pas à être croissante (la cloche monte puis descend).",
 "Vrai : f ≥ 0 et ∫ f = 1."],
'QCM Proba 1 · Q22': [
 "Vrai : de 0 succès à n succès.",
 "Faux : 0 est possible, et ça s'arrête à n.",
 "Faux : la binomiale est discrète (entiers seulement).",
 "Faux : toutes les valeurs entre 0 et n sont possibles."],
'QCM Proba 1 · Q23': [
 "Vrai : l'aire sous la courbe entre a et b.",
 "Faux : pour une variable continue, on intègre, on ne somme pas.",
 "Faux : c'est F(b) − F(a).",
 "Faux : on utilise F (la primitive), pas f."],
'QCM Proba 1 · Q24': [
 "Faux : la somme vaut 1, pas 0.",
 "Vrai : des probabilités ≥ 0 dont le total fait 1.",
 "Faux : aucun rapport entre la masse et la valeur.",
 "Faux : la somme des masses vaut 1. L'espérance, c'est Σ xᵢpᵢ."],
'QCM Proba 1 · Q25': [
 "Faux : ça donne P(X > x) = 1 − F(x).",
 "Faux : formule inventée.",
 "Vrai : F(x) = l'aire sous f à gauche de x.",
 "Faux : c'est F′ = f, pas F = f′."],
'QCM Proba 1 · Q26': [
 "Faux : E = λ.",
 "Faux : E = λ.",
 "Vrai : pour Poisson, espérance = variance = λ.",
 "Faux : Var = λ."],
'QCM Proba 1 · Q27': [
 "Vrai : 1 = succès, 0 = échec.",
 "Faux : c'est 0, pas −1.",
 "Faux : seulement deux valeurs.",
 "Faux : ça, c'est la binomiale."],
'QCM Proba 1 · Q28': [
 "Faux : seul un événement certain a une probabilité de 1.",
 "Vrai : un point isolé a une aire nulle.",
 "Faux : aucune raison.",
 "Faux : f(a) est une densité (une hauteur), pas une probabilité."],
'QCM Proba 1 · Q29': [
 "Faux : pas de carré sur a dans l'espérance, et il en faut un dans la variance.",
 "Faux : il manque + b dans l'espérance, et b ne va pas dans la variance.",
 "Vrai : E = aμ + b, Var = a²σ².",
 "Faux : il manque le a devant μ, et le carré dans la variance."],
'QCM Proba 1 · Q30': [
 "Vrai : P(a ≤ X ≤ b) = ∫ₐᵇ f.",
 "Faux : la probabilité d'une valeur précise est 0.",
 "Faux : seulement pour la loi uniforme.",
 "Faux : c'est l'intégrale de f qui vaut 1, pas une « somme de valeurs »."]
});
