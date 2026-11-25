// ===== QCM du prof — Outils probabilistes =====
// P(subject, chapter, source, question, options (ordre d'origine), index bonne réponse, explication)
P('proba','p1','QCM Proba 0 · Q1',"Dans la formalisation mathématique des probabilités, qu'est-ce qu'un événement lié à une expérience aléatoire d'univers Ω ?",
 ["Une probabilité strictement comprise entre 0 et 1.","Une fonction numérique définie sur Ω.","Un élément unique et indivisible de Ω.","Un sous-ensemble de l'univers Ω appartenant à la tribu associée."],3,
 "Un événement est un ensemble de résultats : une partie A ⊂ Ω qui appartient à la tribu. Un élément ω seul n'est pas un événement ({ω} en est un), et une fonction sur Ω, c'est une variable aléatoire.");
P('proba','p1','QCM Proba 0 · Q2',"Soit Ω un ensemble. Une famille T de parties de Ω est une tribu (ou σ-algèbre) sur Ω si et seulement si :",
 ["Ω appartient à T, T est stable par passage au complémentaire et stable par union dénombrable.","T contient l'ensemble vide et est stable uniquement par union finie.","T est stable par intersection dénombrable mais pas nécessairement par passage au complémentaire.","T est l'ensemble de tous les singletons de Ω."],0,
 "Les 3 axiomes d'une tribu : Ω ∈ T, stabilité par complémentaire, stabilité par union dénombrable (pas seulement finie).");
P('proba','p1','QCM Proba 0 · Q3',"Soit (Ω, T) un espace probabilisable. Une mesure de probabilité P sur cet espace vérifie obligatoirement :",
 ["P(Ω)=1, P(A)≥0 pour tout A dans T, et la σ-additivité sur toute suite d'événements deux à deux disjoints.","P(A) appartient à [-1, 1] pour tout A et P(Ω)=0.","P(A ∩ B)=P(A)P(B) pour tous événements A et B dans T.","P(Ω)=1, P(∅)=1, et P(A ∪ B)=P(A) + P(B) pour tous événements A et B."],0,
 "Définition d'une probabilité : P à valeurs dans [0,1], P(Ω)=1 et σ-additivité pour des événements incompatibles. P(A∩B)=P(A)P(B) n'est vrai que pour des événements indépendants.");
P('proba','p2','QCM Proba 0 · Q4',"Sur un espace probabilisé (Ω, T, P), qu'est-ce qu'une variable aléatoire réelle X ?",
 ["Une mesure de probabilité définie directement sur l'ensemble des réels.","Une fonction quelconque strictement croissante et bijective de R dans R.","Une application mesurable de Ω dans R, c'est-à-dire telle que pour tout intervalle I de R, l'événement (X ∈ I) appartient à la tribu T.","Une variable numérique dont la valeur change spontanément au cours du temps."],2,
 "Une v.a. réelle est une application X : Ω → ℝ mesurable : l'image réciproque de tout intervalle (borélien) est un événement de la tribu.");
P('proba','p1','QCM Proba 0 · Q5',"Soient deux événements A et B avec P(B) > 0. Par définition, la probabilité conditionnelle de A sachant B, notée P(A|B), vaut :",
 ["P(A ∪ B) - P(B).","P(A ∩ B) / P(A).","P(A ∩ B) / P(B).","P(A) × P(B)."],2,
 "P(A|B) = P(A∩B)/P(B) : on divise par la probabilité de la condition B.");
P('proba','p1','QCM Proba 0 · Q6',"Soient deux événements A et B de probabilités non nulles. Quelle affirmation est correcte ?",
 ["A et B sont indépendants si et seulement si P(A ∩ B)=P(A)P(B).","Si A et B sont disjoints (A ∩ B=∅), ils sont nécessairement indépendants.","A et B sont indépendants si et seulement s'ils sont incompatibles (c'est-à-dire A ∩ B=∅).","A et B sont indépendants si et seulement si P(A|B)=P(B|A)."],0,
 "Définition de l'indépendance. Piège : deux événements disjoints de probabilités non nulles sont au contraire dépendants, car P(A∩B)=0 ≠ P(A)P(B).");
P('proba','p2','QCM Proba 0 · Q9',"Soient X et Y deux variables aléatoires admettant une espérance, et a, b deux réels. Quelle relation est toujours vraie ?",
 ["E(aX + bY)=a E(X) + b E(Y) uniquement si X et Y sont indépendantes.","E(aX + b)=a² E(X) + b.","E(XY)=E(X) E(Y) quelles que soient X et Y.","E(aX + bY)=a E(X) + b E(Y), que X et Y soient indépendantes ou non."],3,
 "La linéarité de l'espérance est toujours vraie, sans condition d'indépendance. C'est E(XY)=E(X)E(Y) qui demande l'indépendance.");
P('proba','p2','QCM Proba 0 · Q10',"Pour une variable aléatoire X d'espérance finie et de moment d'ordre 2 fini :",
 ["Var(X)=E(X²) - E(X) et peut être strictement négative.","Var(X)=E[(X - E(X))²] ≥ 0, et Var(X)=0 si et seulement si X est constante presque sûrement.","Var(X)=[E(X)]² - E(X²).","Var(X)=0 implique obligatoirement que X suit une loi normale centrée."],1,
 "Une variance est une moyenne de carrés, donc toujours ≥ 0. Elle est nulle exactement quand X ne varie pas (constante p.s.). Attention : la formule est E(X²) − E(X)², pas l'inverse (dans ta capture tu avais coché c).");
P('proba','p2','QCM Proba 0 · Q11',"Soit X une variable aléatoire admettant une variance Var(X), et soient a, b deux réels. Que vaut Var(aX + b) ?",
 ["a² Var(X) + b².","a Var(X) + b.","a Var(X).","a² Var(X)."],3,
 "Var(aX+b) = a²Var(X). La constante b décale la variable sans changer sa dispersion, donc elle disparaît (dans ta capture tu avais coché a²Var(X) + b²).");
P('proba','p2','QCM Proba 0 · Q12',"Pour deux variables aléatoires X et Y admettant une variance, quelle est l'expression générale de Var(X + Y) ?",
 ["Var(X) + Var(Y) + 2 Cov(X,Y).","Var(X) + Var(Y) dans tous les cas, même si X et Y sont corrélées.","[Var(X) + Var(Y)]².","Var(X) + Var(Y) - 2 Cov(X,Y)."],0,
 "Var(X+Y) = Var(X) + Var(Y) + 2cov(X,Y). Le terme de covariance disparaît seulement si X et Y sont non corrélées (par exemple indépendantes). Le signe − correspond à Var(X − Y).");
P('proba','p2','QCM Proba 0 · Q13',"La covariance entre deux variables aléatoires réelles X et Y est définie par :",
 ["Cov(X,Y)=E[(X - E(X))(Y - E(Y))]=E(XY) - E(X)E(Y).","Cov(X,Y)=E(XY) - [E(X) + E(Y)].","Cov(X,Y)=Var(X) × Var(Y).","Cov(X,Y)=E(X - Y) / [Var(X) + Var(Y)]."],0,
 "Les deux écritures sont équivalentes (on développe le produit). On retient surtout cov = E(XY) − E(X)E(Y).");
P('proba','p2','QCM Proba 0 · Q14',"Quel est le lien général entre l'indépendance de deux variables aléatoires X et Y et leur covariance ?",
 ["L'indépendance implique Cov(X,Y)=0, mais une covariance nulle n'implique pas nécessairement l'indépendance.","L'indépendance et la nullité de la covariance sont strictement équivalentes pour toutes lois.","Deux variables indépendantes ont obligatoirement une covariance égale à 1.","Cov(X,Y)=0 implique toujours que X et Y sont indépendantes."],0,
 "Indépendance ⇒ cov = 0, pas la réciproque. Contre-exemple : X uniforme sur {−1,0,1} et Y = X² ont une covariance nulle mais sont dépendantes.");
P('proba','p5','QCM Proba 0 · Q15',"Le coefficient de corrélation linéaire ρ(X,Y) entre deux variables de variances strictement positives vérifie toujours :",
 ["ρ(X,Y)=Cov(X,Y) / [Var(X)Var(Y)] et appartient à [0, 1].","ρ(X,Y) peut prendre n'importe quelle valeur réelle arbitrairement grande.","ρ(X,Y)=Cov(X,Y) / (σ_X σ_Y) et appartient à l'intervalle [-1, 1].","ρ(X,Y)=0 si et seulement si X et Y sont indépendantes."],2,
 "On divise par le produit des écarts-types (pas des variances). ρ est toujours entre −1 et 1. ρ = 0 n'implique pas l'indépendance.");
P('proba','p5','QCM Proba 0 · Q16',"Que signifie rigoureusement l'égalité |ρ(X,Y)| = 1 ?",
 ["Il existe une relation affine presque sûre entre X et Y (Y=aX + b avec a non nul).","X et Y sont nécessairement indépendantes.","X et Y suivent obligatoirement la même loi de probabilité.","Il existe nécessairement un lien de cause à effet direct entre X et Y."],0,
 "|ρ| = 1 ⇔ Y = aX + b presque sûrement (ρ = 1 si a > 0, ρ = −1 si a < 0). Corrélation ne veut pas dire causalité.");
P('proba','p1','QCM Proba 0 · Q17',"Une famille d'événements (A_i) forme un système complet d'événements (partition de Ω) si :",
 ["Les A_i sont deux à deux disjoints, de probabilités non nulles, et leur réunion est égale à Ω.","L'intersection de tous les A_i est égale à Ω.","La somme de leurs probabilités vaut 0.","Tous les A_i sont indépendants deux à deux et de même probabilité."],0,
 "Système complet = partition : deux à deux disjoints et réunion égale à Ω. La somme de leurs probabilités vaut alors 1.");
P('proba','p1','QCM Proba 0 · Q18',"Soit (A_i) un système complet d'événements et B un événement quelconque. Que donne la formule des probabilités totales ?",
 ["P(B)=somme sur i de [P(B) + P(A_i)].","P(B)=produit sur i de P(B|A_i).","P(B)=somme sur i de P(A_i|B).","P(B)=somme sur i de P(B|A_i)P(A_i)."],3,
 "P(B) = Σ P(B ∩ Aᵢ) = Σ P(B|Aᵢ)P(Aᵢ). On découpe B selon la partition, puis on applique la règle de multiplication.");
P('proba','p1','QCM Proba 0 · Q19',"Soient A et B deux événements de probabilités non nulles. La formule de Bayes exprime P(A|B) sous la forme :",
 ["P(A|B)=P(A ∩ B) / P(A).","P(A|B)=P(B|A) × P(B).","P(A|B)=[P(A|B) P(B)] / P(A).","P(A|B)=[P(B|A) P(A)] / P(B)."],3,
 "Bayes : P(A|B) = P(B|A)P(A)/P(B). Elle vient de P(A∩B) = P(B|A)P(A) = P(A|B)P(B).");
P('proba','p1','QCM Proba 0 · Q20',"Dans la formule de Bayes P(A_k|B) = [P(B|A_k)P(A_k)] / [somme_i P(B|A_i)P(A_i)], que représentent P(A_k) et P(A_k|B) ?",
 ["P(A_k) est la probabilité a priori de l'hypothèse A_k, et P(A_k|B) est sa probabilité a posteriori sachant l'observation B.","P(A_k|B) est toujours égale à P(A_k) quelle que soit l'observation B.","P(A_k) est la probabilité a posteriori et P(A_k|B) est la probabilité a priori.","P(A_k|B) est la vraisemblance de l'observation B et ne dépend pas de P(A_k)."],0,
 "A priori = avant l'observation : P(Aₖ). A posteriori = après avoir observé B : P(Aₖ|B). La vraisemblance, c'est P(B|Aₖ).");

P('proba','p2','QCM Proba 1 · Q1',"Quelle propriété caractérise la fonction de répartition d'une variable aléatoire ?",
 ["Elle est toujours strictement croissante et dérivable.","Elle prend uniquement les valeurs 0 et 1.","Elle est croissante et ses limites en moins l'infini et plus l'infini valent respectivement 0 et 1.","Elle est décroissante et ses limites valent 1 puis 0."],2,
 "F est croissante (au sens large), de limite 0 en −∞ et 1 en +∞. Dans le cas discret elle est en escalier, donc ni strictement croissante ni dérivable.");
P('proba','p3','QCM Proba 1 · Q2',"Pour Z suivant la loi normale N(0,1), quelle transformation standardise X suivant N(μ,σ²) ?",
 ["Z=(X-μ)/σ².","Z=(X-μ)/σ.","Z=μX/σ.","Z=(X-σ)/μ."],1,
 "On centre (− μ) puis on réduit en divisant par l'écart-type σ, pas par la variance σ². Ici le prof note N(μ, σ²) avec la variance en 2ᵉ paramètre.");
P('proba','p2','QCM Proba 1 · Q3',"Quel énoncé décrit une variable aléatoire discrète ?",
 ["C'est une variable mutable.","Elle ne peut prendre que des valeurs strictement positives.","C'est une fonction qui prend nécessairement toutes les valeurs réelles d'un intervalle.","C'est une fonction qui prend ses valeurs dans un ensemble fini ou dénombrable."],3,
 "Discrète = ensemble de valeurs fini ou dénombrable (ex. : 0, 1, 2, …). Prendre toutes les valeurs d'un intervalle, c'est le cas continu.");
P('proba','p3','QCM Proba 1 · Q4',"Si X suit une loi normale N(μ,σ²), quelle propriété découle de la symétrie autour de μ ?",
 ["P(X≤μ)=1.","P(X=μ)=0,5.","P(X≥μ)=0.","P(X≤μ)=0,5."],3,
 "La courbe est symétrique autour de μ : la moitié de l'aire est à gauche. P(X = μ) vaut 0 (variable continue), pas 0,5.");
P('proba','p2','QCM Proba 1 · Q5',"Si X suit une loi de Bernoulli de paramètre p, alors :",
 ["E(X)=p.","E(X)=1.","E(X)=1-p.","E(X)=p(1-p)."],0,
 "E(X) = 1×p + 0×(1−p) = p. Ne pas confondre avec la variance p(1−p).");
P('proba','p2','QCM Proba 1 · Q6',"Pour une variable discrète X, que représente p(x)=P(X=x) ?",
 ["x.","La probabilité que X prenne exactement la valeur x.","L'espérance de X conditionnellement à X","La probabilité que X soit inférieure à x.","La densité de X au point x."],1,
 "C'est le poids de la valeur x. « Inférieure à x », c'est la fonction de répartition ; « densité », c'est le vocabulaire du cas continu.");
P('proba','p2','QCM Proba 1 · Q7',"X suit B(4; 0,5). Quelle est P(X=0) ?",
 ["0,5","0,125","0,25","0,0625"],3,
 "P(X=0) = C(4,0) × 0,5⁰ × 0,5⁴ = 0,5⁴ = 1/16 = 0,0625 (4 échecs de suite).");
P('proba','p2','QCM Proba 1 · Q8',"Quelle formule donne la variance d'une variable X d'espérance finie ?",
 ["Var(X)=E(X²)-[E(X)]².","Var(X)=E(X²)+[E(X)]².","Var(X)=E(X)-E(X²).","Var(X)=[E(X)]²-E(X²)."],0,
 "Formule de König-Huygens : « moyenne des carrés moins carré de la moyenne ».");
P('proba','p2','QCM Proba 1 · Q9',"Si X suit une loi de Bernoulli de paramètre p, alors :",
 ["Var(X)=p².","Var(X)=p(1-p).","Var(X)=p.","Var(X)=1-p."],1,
 "E(X²) = p (car X² = X) et E(X)² = p², donc Var(X) = p − p² = p(1−p).");
P('proba','p2','QCM Proba 1 · Q10',"La fonction de répartition F_X(x) est définie par :",
 ["E(X≤x).","P(X≥x).","P(X≤x).","P(X=x)."],2,
 "Le prof utilise ici F(x) = P(X ≤ x). Attention : le diaporama du cours écrit F(x) = P(X < x). Les deux conventions existent ; dans ce QCM, la seule réponse proposée est P(X ≤ x).");
P('proba','p3','QCM Proba 1 · Q11',"Si X suit la loi uniforme sur [a;b], quelle est son espérance ?",
 ["ab.","b-a.","(a+b)/2.","(b-a)²/12."],2,
 "L'espérance est le milieu de l'intervalle. (b−a)²/12 est la variance.");
P('proba','p2','QCM Proba 1 · Q12',"X prend les valeurs 0, 1 et 2 avec probabilités 0,2 ; 0,5 ; 0,3. Quelle est P(X≥1) ?",
 ["0,5","0,8","0,3","0,7"],1,
 "P(X ≥ 1) = P(X=1) + P(X=2) = 0,5 + 0,3 = 0,8. Ou bien 1 − P(X=0) = 1 − 0,2.");
P('proba','p3','QCM Proba 1 · Q13',"Pour X suivant une loi exponentielle de paramètre λ>0, quelle est la fonction de survie P(X>t), pour t≥0 ?",
 ["e^(-λt).","λe^(-λt).","e^(-t/λ).","1-e^(-λt)."],0,
 "F(t) = 1 − e^(−λt), donc P(X > t) = 1 − F(t) = e^(−λt). λe^(−λt) est la densité.");
P('proba','p2','QCM Proba 1 · Q14',"Si X suit B(n,p), quelles sont son espérance et sa variance ?",
 ["E(X)=np et Var(X)=np(1-p).","E(X)=p et Var(X)=np.","E(X)=np(1-p) et Var(X)=np.","E(X)=n(1-p) et Var(X)=np²."],0,
 "Somme de n Bernoulli indépendantes : on multiplie par n l'espérance p et la variance p(1−p).");
P('proba','p3','QCM Proba 1 · Q15',"Si X suit une loi exponentielle de paramètre λ>0, alors :",
 ["E(X)=λ.","E(X)=0.","E(X)=1/λ.","E(X)=λ²."],2,
 "E(X) = 1/λ. Si λ est un taux (pannes par heure), 1/λ est la durée moyenne (MTBF). Ne pas confondre avec Poisson où E = λ.");
P('proba','p3','QCM Proba 1 · Q16',"La propriété sans mémoire de la loi exponentielle exprime que, pour s,t≥0 :",
 ["P(X>s+t | X>s)=P(X≤t).","P(X>s+t)=P(X>s)+P(X>t).","P(X>s+t | X>s)=P(X>s).","P(X>s+t | X>s)=P(X>t)."],3,
 "Ayant déjà survécu s, la probabilité de survivre t de plus est la même qu'au départ : P(X>s+t | X>s) = P(X>t). Le cours l'écrit P(T≥t₂ | T≥t₁) = P(T ≥ t₂−t₁).");
P('proba','p2','QCM Proba 1 · Q17',"Une loi de Poisson de paramètre λ modélise principalement :",
 ["Un nombre d'occurrences dans un intervalle ou une région, lorsque les occurrences sont rares et décrites par un taux moyen.","Le résultat d'un seul essai à deux issues.","Une mesure continue symétrique autour de zéro.","Une durée d'attente négative."],0,
 "Poisson = nombre d'événements pendant un temps donné, à fréquence moyenne λ connue. Un essai à deux issues, c'est Bernoulli.");
P('proba','p3','QCM Proba 1 · Q18',"X suit la loi uniforme sur [0;2]. Quelle est P(0,5≤X≤1,5) ?",
 ["1","0,5","0,25","0,75"],1,
 "Longueur de l'intervalle / longueur totale = 1/2 = 0,5 (densité 1/2 sur une longueur 1).");
P('proba','p2','QCM Proba 1 · Q19',"X vaut 1 avec probabilité 0,25 et 3 avec probabilité 0,75. Quelle est E(X) ?",
 ["3","2,75","2","2,5"],3,
 "E(X) = 1×0,25 + 3×0,75 = 0,25 + 2,25 = 2,5.");
P('proba','p2','QCM Proba 1 · Q20',"Dans quelles conditions le nombre de succès sur n essais suit-il une loi binomiale B(n,p) ?",
 ["On observe une durée d'attente continue.","Le nombre d'essais est aléatoire et les succès sont certains.","Les essais sont indépendants, en nombre fixé, et chaque essai a la même probabilité p de succès.","Les essais sont dépendants et la probabilité de succès varie à chaque essai."],2,
 "Binomiale : n fixé, essais indépendants, même p à chaque essai (schéma de Bernoulli).");
P('proba','p3','QCM Proba 1 · Q21',"Quelle condition doit vérifier une densité f ?",
 ["f(x)≤0 et son intégrale vaut 0.","f(x)≤1 pour tout x et sa somme vaut 1.","f(x) est croissante et son intégrale vaut 1.","f(x)≥0 et l'intégrale de f sur R vaut 1."],3,
 "Densité : positive et d'intégrale totale 1. Elle peut dépasser 1 et n'a pas besoin d'être croissante.");
P('proba','p2','QCM Proba 1 · Q22',"Si X suit une loi binomiale B(n,p), quelles valeurs peut-elle prendre ?",
 ["Les entiers 0, 1, ..., n.","Tous les entiers strictement positifs.","Tous les réels entre 0 et n.","Seulement 0 et n."],0,
 "On compte des succès parmi n essais : de 0 (aucun) à n (tous).");
P('proba','p3','QCM Proba 1 · Q23',"Pour une variable continue de densité f, P(a≤X≤b) vaut :",
 ["L'intégrale de f(x) entre a et b.","La somme des valeurs possibles entre a et b.","F(a)+F(b).","f(b)-f(a)."],0,
 "C'est l'aire sous la densité entre a et b. Avec la répartition : F(b) − F(a), et non F(a) + F(b) ni f(b) − f(a).");
P('proba','p2','QCM Proba 1 · Q24',"Une loi discrète attribue les masses p(x_i) à ses valeurs possibles. Quelle condition doit-elle vérifier ?",
 ["Toutes les masses sont strictement positives et leur somme vaut 0.","Toutes les masses sont positives ou nulles et leur somme vaut 1.","Chaque masse est inférieure à la valeur correspondante.","La somme des masses vaut l'espérance."],1,
 "Ce sont des probabilités : chacune ≥ 0, et le total fait 1.");
P('proba','p3','QCM Proba 1 · Q25',"Lorsque X possède une densité f, la fonction de répartition vérifie :",
 ["F(x)=l'intégrale de f(t) de x à plus l'infini.","F(x)=1-f(x) pour tout x.","F(x)=l'intégrale de f(t) de moins l'infini à x.","F(x)=f'(x)."],2,
 "F(x) = ∫ de −∞ à x de f(t) dt (l'aire à gauche de x). C'est F′ = f, pas F = f′. L'intégrale de x à +∞ donne 1 − F(x).");
P('proba','p2','QCM Proba 1 · Q26',"Si X suit une loi de Poisson P(λ), alors :",
 ["E(X)=1 et Var(X)=λ.","E(X)=λ² et Var(X)=λ.","E(X)=λ et Var(X)=λ.","E(X)=λ et Var(X)=λ²."],2,
 "Particularité de Poisson : espérance = variance = λ.");
P('proba','p2','QCM Proba 1 · Q27',"Si X suit une loi de Bernoulli de paramètre p, quelles sont ses valeurs possibles ?",
 ["0 et 1.","-1 et 1.","Tous les entiers naturels.","0, 1, ..., n pour un n quelconque."],0,
 "Bernoulli : 1 (succès) avec probabilité p, 0 (échec) avec probabilité 1−p. 0, 1, …, n c'est la binomiale.");
P('proba','p3','QCM Proba 1 · Q28',"Si X est une variable aléatoire continue, que vaut P(X=a) ?",
 ["1.","0.","Cela vaut toujours 1/2.","f(a)."],1,
 "L'aire sous la courbe sur un seul point est nulle : P(X = a) = 0. Ce n'est pas f(a).");

P('proba','p2','QCM Proba 1 · Q29',"Si X a une espérance μ et une variance σ², et Y=aX+b, alors :",
 ["E(Y)=a²μ+b et Var(Y)=aσ².","E(Y)=aμ et Var(Y)=aσ²+b.","E(Y)=aμ+b et Var(Y)=a²σ².","E(Y)=μ+b et Var(Y)=aσ²."],2,
 "L'espérance est affine : E(aX+b) = aμ + b. La variance prend a² et ignore b : Var(aX+b) = a²σ².");
P('proba','p3','QCM Proba 1 · Q30',"Une variable aléatoire continue est décrite par une densité f telle que :",
 ["La probabilité d'un intervalle se calcule par l'intégrale de f sur cet intervalle.","La probabilité de chaque valeur est donnée par f(x).","La densité est toujours constante.","La somme des valeurs de f est égale à 1."],0,
 "P(a ≤ X ≤ b) = ∫ₐᵇ f. f(x) n'est pas la probabilité de x (qui vaut 0). C'est l'intégrale de f, pas la « somme de ses valeurs », qui vaut 1.");

// ===== Questions de révision (créées à partir du cours) =====
// Q(subject, chapter, question, [bonne réponse, mauvaises…], explication)

// --- p1 Espace probabilisé ---
Q('proba','p1',"Qu'est-ce que l'univers Ω d'une expérience aléatoire ?",["L'ensemble de tous les résultats possibles de l'expérience","Le résultat le plus probable de l'expérience","La probabilité totale, égale à 1","L'ensemble des événements de probabilité non nulle"],"Ω contient toutes les issues ω possibles. Ce n'est pas un nombre.");
Q('proba','p1',"Une expérience est dite aléatoire si…",["on ne peut pas prévoir son résultat et la répéter peut donner un résultat différent","tous ses résultats ont la même probabilité","son univers est infini","elle ne peut être réalisée qu'une seule fois"],"Les deux critères du cours : imprévisible, et non reproductible à l'identique.");
Q('proba','p1',"Comment appelle-t-on un événement réduit à un seul résultat {a} ?",["Un événement élémentaire","Un événement certain","Un événement impossible","Un système complet"],"Un singleton {a} est un événement élémentaire.");
Q('proba','p1',"L'événement contraire de A, noté Ā, correspond à :",["Ω \\ A, l'ensemble des résultats qui ne sont pas dans A","A ∩ Ω","l'ensemble vide","A ∪ Ω"],"Ā = Ω privé de A : il est réalisé exactement quand A ne l'est pas.");
Q('proba','p1',"« A ou B est réalisé » correspond à quelle opération ?",["A ∪ B","A ∩ B","A \\ B","Ā ∩ B̄"],"« Ou » (au moins l'un des deux) = union. « Et » = intersection.");
Q('proba','p1',"Laquelle de ces familles est toujours une tribu sur Ω ?",["{∅, Ω}","{∅}","{Ω}","{A, Ā} pour A ≠ ∅"],"{∅, Ω} contient Ω, est stable par complémentaire et par union : c'est la tribu grossière. {A, Ā} seule ne contient pas Ω.");
Q('proba','p1',"Quelle propriété se déduit des axiomes d'une tribu C ?",["∅ ∈ C et C est stable par intersection dénombrable","C contient tous les singletons de Ω","C est finie","C est égale à P(Ω)"],"∅ est le complémentaire de Ω. L'intersection s'obtient par complémentaires et unions (lois de De Morgan).");
Q('proba','p1',"Comment appelle-t-on le couple (Ω, C) où C est une tribu ?",["Un espace probabilisable","Un espace probabilisé","Une loi de probabilité","Un système complet d'événements"],"(Ω, C) est probabilisable. On ajoute P pour obtenir l'espace probabilisé (Ω, C, P).");
Q('proba','p1',"Deux événements A et B sont incompatibles si…",["A ∩ B = ∅","P(A ∩ B) = P(A)P(B)","A ∪ B = Ω","P(A) + P(B) = 1"],"Incompatibles = disjoints : ils ne peuvent pas se produire en même temps.");
Q('proba','p1',"Que vaut P(A ∪ B) en général ?",["P(A) + P(B) − P(A ∩ B)","P(A) + P(B)","P(A) × P(B)","P(A) + P(B) + P(A ∩ B)"],"On retire P(A∩B), qui est comptée deux fois. La formule simple P(A)+P(B) ne vaut que si A et B sont incompatibles.");
Q('proba','p1',"P(A) = 0,3, P(B) = 0,5 et P(A ∩ B) = 0,1. Que vaut P(A ∪ B) ?",["0,7","0,8","0,15","0,9"],"0,3 + 0,5 − 0,1 = 0,7.");
Q('proba','p1',"Si A ⊂ B, alors :",["P(A) ≤ P(B)","P(A) ≥ P(B)","P(A) = P(B)","P(A) + P(B) = 1"],"La probabilité est croissante pour l'inclusion.");
Q('proba','p1',"P(A) = 0 implique-t-il A = ∅ ?",["Non, A est seulement presque impossible","Oui, toujours","Oui, si Ω est infini","Non, sauf si A est un singleton"],"Un événement de probabilité nulle peut être non vide. Exemple : {X = 2} pour une variable continue.");
Q('proba','p1',"P(A) = 0,4. Que vaut P(Ā) ?",["0,6","0,4","0","1,4"],"P(Ā) = 1 − P(A) = 0,6.");
Q('proba','p1',"Quelle est la règle de multiplication ?",["P(A ∩ B) = P(A | B) P(B)","P(A ∩ B) = P(A) + P(B)","P(A | B) = P(A) P(B)","P(A ∪ B) = P(A | B) P(A)"],"Elle découle directement de la définition P(A|B) = P(A∩B)/P(B).");
Q('proba','p1',"Si A et B sont incompatibles (et P(B) > 0), que vaut P(A | B) ?",["0","P(A)","1","P(A)/P(B)"],"P(A∩B) = P(∅) = 0, donc P(A|B) = 0 : si B est arrivé, A ne peut pas arriver.");
Q('proba','p1',"B étant fixé avec P(B) > 0, l'application A ↦ P(A | B) est :",["une probabilité sur Ω","une variable aléatoire","une tribu","une densité"],"P_B est une probabilité. On a par exemple P(Ā|B) = 1 − P(A|B).");
Q('proba','p1',"P(B) = 0,5 et P(A ∩ B) = 0,2. Que vaut P(A | B) ?",["0,4","0,1","0,25","0,7"],"0,2 / 0,5 = 0,4.");
Q('proba','p1',"1 % de la population est malade. Un test est positif chez 99 % des malades et chez 5 % des sains. Le test est positif : quelle est (environ) la probabilité d'être malade ?",["≈ 17 %","≈ 99 %","≈ 95 %","≈ 1 %"],"P(+) = 0,99×0,01 + 0,05×0,99 = 0,0594. P(M|+) = 0,0099/0,0594 ≈ 0,167. Le faible a priori (1 %) l'emporte.");
Q('proba','p1',"Une urne A (choisie avec proba 1/2) contient 3 rouges sur 4 boules, une urne B (proba 1/2) contient 1 rouge sur 4. On tire une boule : probabilité qu'elle soit rouge ?",["1/2","3/4","1/4","3/8"],"Probabilités totales : 1/2 × 3/4 + 1/2 × 1/4 = 3/8 + 1/8 = 1/2.");
Q('proba','p1',"Même situation (urnes A et B équiprobables, 3/4 et 1/4 de rouges). La boule tirée est rouge : probabilité qu'elle vienne de A ?",["3/4","1/2","3/8","1/4"],"Bayes : (3/4 × 1/2) / (1/2) = 3/4.");
Q('proba','p1',"A et B sont indépendants, P(A) = 0,5 et P(B) = 0,4. Que vaut P(A ∩ B) ?",["0,2","0,9","0,1","0,45"],"Indépendance : P(A∩B) = P(A)P(B) = 0,2.");
Q('proba','p1',"Dire que A est indépendant de B signifie que :",["savoir que B est réalisé ne change pas la probabilité de A","A et B ne peuvent pas arriver ensemble","A ∪ B = Ω","P(A) = P(B)"],"P(A|B) = P(A) : l'information « B est arrivé » n'apporte rien sur A.");
Q('proba','p1',"Si A est indépendant de B, alors :",["B est indépendant de A","B est incompatible avec A","A ⊂ B","P(A) = 0"],"L'indépendance est symétrique (P(A∩B) = P(A)P(B) est symétrique en A et B).");
Q('proba','p1',"A et B sont incompatibles avec P(A) = 0,3 et P(B) = 0,2. Sont-ils indépendants ?",["Non, car P(A ∩ B) = 0 ≠ 0,06","Oui, car ils sont incompatibles","Oui, car P(A) + P(B) < 1","On ne peut pas savoir"],"Incompatibles et de probabilités non nulles ⇒ dépendants. C'est le piège classique.");
Q('proba','p1',"Dans la seconde formule de Bayes, le dénominateur Σ P(A|Bₖ)P(Bₖ) est égal à :",["P(A), par la formule des probabilités totales","P(Bᵢ)","1","P(A ∩ Bᵢ)"],"Le dénominateur, c'est P(A) développé sur le système complet (Bₖ).");
Q('proba','p1',"Quel est le rôle de la tribu dans un espace probabilisé ?",["Lister les parties de Ω auxquelles on peut attribuer une probabilité","Donner la probabilité de chaque événement","Définir les valeurs d'une variable aléatoire","Garantir que les événements sont indépendants"],"La tribu fixe les événements « mesurables ». C'est P qui leur attribue un nombre.");

// --- p2 Variables discrètes ---
Q('proba','p2',"Pour donner un sens à P(X = t), il faut que :",["X⁻¹({t}) appartienne à la tribu C","X soit bijective","t appartienne à Ω","X soit continue"],"P(X = t) = P(X⁻¹({t})) : l'image réciproque doit être un événement. D'où la notion de fonction mesurable.");
Q('proba','p2',"La tribu borélienne sur ℝ est :",["la tribu engendrée par les intervalles de ℝ","l'ensemble des intervalles de ℝ","l'ensemble des singletons de ℝ","la tribu {∅, ℝ}"],"Engendrée par les intervalles, elle contient aussi leurs unions, complémentaires, etc., qui ne sont pas forcément des intervalles.");
Q('proba','p2',"On lance deux pièces, X = nombre de Pile. Que vaut P(X = 1) ?",["1/2","1/4","3/4","1/3"],"(P,F) et (F,P) : 2 issues sur 4.");
Q('proba','p2',"On lance deux pièces, X = nombre de Pile. Que vaut E(X) ?",["1","0,5","2","1,5"],"0×1/4 + 1×1/2 + 2×1/4 = 1.");
Q('proba','p2',"On lance deux pièces, X = nombre de Pile. Que vaut Var(X) ?",["0,5","1","0,25","1,5"],"E(X²) = 0 + 1/2 + 4/4 = 1,5 ; Var = 1,5 − 1² = 0,5. (C'est aussi une B(2 ; 0,5) : np(1−p) = 0,5.)");
Q('proba','p2',"Pour une variable discrète, la fonction de répartition est :",["croissante et en escalier","continue et strictement croissante","décroissante","constante"],"Elle saute aux valeurs prises par X et reste constante entre deux.");
Q('proba','p2',"Avec F(x) = P(X < x), comment calcule-t-on P(a ≤ X < b) ?",["F(b) − F(a)","F(a) − F(b)","F(b) + F(a)","F(b) × F(a)"],"P(X < b) − P(X < a) = P(a ≤ X < b).");
Q('proba','p2',"E(X) = 3. Que vaut E(2X + 5) ?",["11","6","3","16"],"E(aX + b) = aE(X) + b = 2×3 + 5 = 11.");
Q('proba','p2',"Var(X) = 4. Que vaut Var(−3X + 7) ?",["36","−12","12","43"],"Var(aX + b) = a²Var(X) = 9 × 4 = 36. Le signe de a disparaît avec le carré, et b disparaît.");
Q('proba','p2',"σ(X) = 2. Que vaut σ(−3X + 1) ?",["6","−6","18","7"],"σ(aX + b) = |a|σ(X) = 3 × 2 = 6. Un écart-type est toujours positif.");
Q('proba','p2',"E(X) = 2 et E(X²) = 7. Que vaut Var(X) ?",["3","5","−3","9"],"König-Huygens : 7 − 2² = 3.");
Q('proba','p2',"X et Y indépendantes, Var(X) = 2 et Var(Y) = 3. Que vaut Var(X − Y) ?",["5","−1","1","6"],"Var(X − Y) = Var(X) + (−1)²Var(Y) = 5. Les variances s'ajoutent même pour une différence.");
Q('proba','p2',"Que vaut cov(X, X) ?",["Var(X)","0","1","E(X)²"],"cov(X,X) = E(X²) − E(X)² = Var(X).");
Q('proba','p2',"X uniforme sur {−1, 0, 1} et Y = X². Que vaut cov(X, Y) ?",["0, alors que X et Y sont dépendantes","0, donc X et Y sont indépendantes","1","−1"],"cov = E(X³) − E(X)E(X²) = 0 − 0 = 0. Pourtant Y est entièrement déterminée par X : le contre-exemple classique.");
Q('proba','p2',"Que dit l'inégalité de Bienaymé-Tchebychev ?",["P(|X − E(X)| > kσ) ≤ 1/k²","P(|X − E(X)| > kσ) ≥ 1/k²","P(X > k) ≤ E(X)/k²","P(|X| > k) = 1/k"],"Elle borne la probabilité de s'écarter de la moyenne de plus de k écarts-types, quelle que soit la loi.");
Q('proba','p2',"D'après Bienaymé-Tchebychev, la probabilité de s'écarter de la moyenne de plus de 3σ est au plus :",["1/9","1/3","3/9","0,003"],"1/k² avec k = 3 : 1/9 ≈ 0,11. (Pour une loi normale, c'est bien moins : ≈ 0,003.)");
Q('proba','p2',"Le moment centré d'ordre 2, μ₂, est égal à :",["la variance","l'espérance","0","l'écart-type"],"μ₂ = E[(X − m)²] = Var(X). Et μ₁ = 0.");
Q('proba','p2',"Le coefficient d'asymétrie (skewness) est défini par :",["γ₁ = μ₃ / σ³","γ₁ = μ₄ / σ⁴","γ₁ = μ₂ / σ²","γ₁ = μ₃ / σ²"],"Skewness = μ₃/σ³ (asymétrie). Kurtosis = μ₄/σ⁴ (aplatissement).");
Q('proba','p2',"X uniforme sur {1, 2, …, 6} (un dé). Que vaut E(X) ?",["3,5","3","6","21"],"(n+1)/2 = 7/2 = 3,5.");
Q('proba','p2',"X uniforme sur {1, …, 6}. Que vaut Var(X) ?",["35/12","3,5","6","1/6"],"(n² − 1)/12 = 35/12 ≈ 2,92.");
Q('proba','p2',"X ~ B(10 ; 0,3). Que vaut E(X) ?",["3","0,3","2,1","7"],"np = 10 × 0,3 = 3.");
Q('proba','p2',"X ~ B(10 ; 0,3). Que vaut Var(X) ?",["2,1","3","0,21","0,7"],"np(1−p) = 10 × 0,3 × 0,7 = 2,1.");
Q('proba','p2',"X ~ B(4 ; 0,5). Que vaut P(X = 2) ?",["0,375","0,5","0,25","0,0625"],"C(4,2) × 0,5⁴ = 6/16 = 0,375.");
Q('proba','p2',"On lance un dé jusqu'à obtenir un 6. Le nombre de lancers suit :",["une loi géométrique G(1/6)","une loi binomiale B(6 ; 1/6)","une loi de Poisson P(6)","une loi uniforme sur {1,…,6}"],"On compte le rang du premier succès : loi géométrique de paramètre p = 1/6.");
Q('proba','p2',"X ~ G(1/6). Combien de lancers faut-il en moyenne ?",["6","1/6","5","36"],"E(X) = 1/p = 6.");
Q('proba','p2',"X ~ G(p). Que vaut P(X = k) ?",["p(1 − p)^(k−1)","p^k (1 − p)","(1 − p)^k","C(n,k) p^k"],"k − 1 échecs puis un succès.");
Q('proba','p2',"X ~ G(p). Que vaut Var(X) ?",["(1 − p)/p²","1/p","p(1 − p)","1/p²"],"Var = (1 − p)/p².");
Q('proba','p2',"On tire n boules sans remise dans une urne de N boules dont K blanches. Le nombre de blanches suit :",["une loi hypergéométrique H(N, K, n)","une loi binomiale B(n, K/N)","une loi géométrique","une loi de Poisson"],"Sans remise : hypergéométrique. Avec remise, ce serait une binomiale.");
Q('proba','p2',"X ~ H(N, K, n). Que vaut E(X) ?",["nK/N","K/N","nK","n(N − K)/N"],"Même espérance que la binomiale B(n, p) avec p = K/N.");
Q('proba','p2',"Comparée à B(n, K/N), la variance de H(N, K, n) est multipliée par :",["(N − n)/(N − 1)","N/n","(N − 1)/(N − n)","K/N"],"Ce facteur est < 1 (dès que n > 1) : le tirage sans remise réduit la variance.");
Q('proba','p2',"X ~ P(λ). Que vaut P(X = k) ?",["e^(−λ) λ^k / k!","λ e^(−λk)","C(n,k) λ^k","λ^k / k"],"Formule de la loi de Poisson.");
Q('proba','p2',"X ~ P(2). Que vaut P(X = 0) ?",["e^(−2) ≈ 0,135","0","2e^(−2)","1/2"],"e^(−λ) λ⁰/0! = e^(−2).");
Q('proba','p2',"Quand peut-on approcher B(n ; p) par une loi de Poisson ?",["Pour n ≥ 30 et np < 5, avec λ = np","Pour n ≤ 10 et p = 0,5","Pour np ≥ 5 et n(1−p) ≥ 5","Jamais"],"Beaucoup d'essais, succès rares : Poisson de paramètre λ = np. Les conditions np ≥ 5 et n(1−p) ≥ 5 sont celles de l'approximation normale.");
Q('proba','p2',"B(100 ; 0,02) est bien approchée par :",["P(2)","P(100)","N(2 ; 2)","P(0,02)"],"n = 100 ≥ 30 et np = 2 < 5 → Poisson de paramètre λ = np = 2.");
Q('proba','p2',"Pour X et Y quelconques (avec espérance), E(X + Y) = E(X) + E(Y) est :",["toujours vraie","vraie seulement si X et Y sont indépendantes","vraie seulement si cov(X,Y) = 0","fausse en général"],"La linéarité de l'espérance ne demande aucune hypothèse.");
Q('proba','p2',"Var(X) = 0 signifie que :",["X est constante presque sûrement","X suit une loi normale centrée","E(X) = 0","X est indépendante d'elle-même"],"Pas de dispersion = pas de variation.");

// --- p3 Variables continues ---
Q('proba','p3',"X est uniforme sur [0 ; 0,5]. Que vaut sa densité sur cet intervalle ?",["2","0,5","1","0,25"],"f = 1/(b−a) = 1/0,5 = 2. Une densité peut dépasser 1 : seule l'aire compte.");
Q('proba','p3',"Pour une variable continue, P(a ≤ X ≤ b) et P(a < X < b) sont :",["égales","différentes de P(X = a) + P(X = b)","toujours égales à 1/2","impossibles à comparer"],"P(X = a) = P(X = b) = 0, donc inclure ou non les bornes ne change rien.");
Q('proba','p3',"Pour une variable continue, la fonction de répartition F est :",["continue sur ℝ","en escalier","décroissante","toujours dérivable avec F′ = 1"],"C'est une intégrale de f, donc continue. En escalier, c'est le cas discret.");
Q('proba','p3',"Si la densité f est continue, que vaut F′(x) ?",["f(x)","F(x)","1 − f(x)","∫ f"],"F est une primitive de f.");
Q('proba','p3',"Comment calcule-t-on E(X) pour une variable continue ?",["∫ x f(x) dx","∫ f(x) dx","Σ x f(x)","∫ x² f(x) dx"],"Les sommes deviennent des intégrales, pondérées par la densité.");
Q('proba','p3',"X ~ U(2, 8). Que vaut E(X) ?",["5","6","3","10"],"(a + b)/2 = 10/2 = 5.");
Q('proba','p3',"X ~ U(0, 6). Que vaut Var(X) ?",["3","6","36","0,5"],"(b − a)²/12 = 36/12 = 3.");
Q('proba','p3',"X ~ U(0, 10). Que vaut P(2 ≤ X ≤ 5) ?",["0,3","0,5","0,2","3"],"(5 − 2)/10 = 0,3.");
Q('proba','p3',"X ~ E(λ). Que vaut Var(X) ?",["1/λ²","1/λ","λ","λ²"],"Var = 1/λ², donc σ = 1/λ = E(X).");
Q('proba','p3',"La densité de la loi exponentielle E(λ) est :",["λ e^(−λx) pour x ≥ 0, 0 sinon","e^(−λx) pour tout x","λ x e^(−x)","1/λ e^(−x/λ) pour x < 0"],"f(x) = λe^(−λx) sur [0, +∞[.");
Q('proba','p3',"Un composant a une durée de vie exponentielle de moyenne 1000 h. Que vaut λ ?",["0,001 par heure","1000 par heure","0,01 par heure","1 par heure"],"E = 1/λ = 1000 donc λ = 1/1000.");
Q('proba','p3',"En fiabilité, pour une loi exponentielle, 1/λ s'appelle :",["le MTBF (temps moyen entre pannes)","le taux de défaillance","la médiane","la variance"],"λ = taux de défaillance ; 1/λ = Mean Time Between Failures.");
Q('proba','p3',"Une ampoule de durée de vie exponentielle fonctionne déjà depuis 500 h. Sa probabilité de durer encore 100 h est :",["la même qu'une ampoule neuve de durer 100 h","plus faible qu'une ampoule neuve","nulle","égale à P(X > 600)"],"Propriété sans mémoire : P(X > 600 | X > 500) = P(X > 100).");
Q('proba','p3',"X ~ γᵣ. Que valent E(X) et Var(X) ?",["E = r et Var = r","E = r et Var = r²","E = 1/r et Var = 1/r²","E = 0 et Var = r"],"Pour la loi gamma γᵣ du cours, espérance et variance valent r.");
Q('proba','p3',"Si r est un entier positif, la loi γᵣ s'appelle :",["loi d'Erlang","loi de Cauchy","loi de Student","loi log-normale"],"Gamma à paramètre entier = Erlang.");
Q('proba','p3',"X ~ γ₂ et Y ~ γ₃ indépendantes. Quelle est la loi de X + Y ?",["γ₅","γ₆","γ₁","N(5 ; 5)"],"Additivité : γᵣ + γₛ = γᵣ₊ₛ.");
Q('proba','p3',"Si X ~ E(λ), alors λX suit :",["la loi γ₁","la loi E(1/λ)","la loi N(0,1)","la loi γ_λ"],"Remarque du cours : l'exponentielle de paramètre 1 est la gamma γ₁.");
Q('proba','p3',"Dans la notation du cours N(m, σ), le second paramètre est :",["l'écart-type","la variance","la médiane","le mode"],"Le cours met l'écart-type. Beaucoup de livres écrivent N(μ, σ²) avec la variance : regarde s'il y a un carré.");
Q('proba','p3',"X ~ N(10, 2) (écart-type 2). Quelle variable suit N(0, 1) ?",["(X − 10)/2","(X − 10)/4","(X − 2)/10","X/2 − 10"],"On retire la moyenne puis on divise par l'écart-type.");
Q('proba','p3',"Pour U ~ N(0, 1), P(U ≤ −u) est égal à :",["1 − P(U ≤ u)","P(U ≤ u)","−P(U ≤ u)","P(U ≤ u) − 1"],"Par symétrie, P(U ≤ −u) = P(U ≥ u) = 1 − P(U ≤ u).");
Q('proba','p3',"Pour U ~ N(0, 1) et Φ sa fonction de répartition, P(|U| ≤ u) vaut :",["2Φ(u) − 1","Φ(u)","1 − Φ(u)","2Φ(u)"],"Φ(u) − Φ(−u) = Φ(u) − (1 − Φ(u)) = 2Φ(u) − 1.");
Q('proba','p3',"Pour X ~ N(m, σ), P(m − σ ≤ X ≤ m + σ) vaut environ :",["0,68","0,95","0,5","0,997"],"Valeurs remarquables : 68 % à 1σ, 95 % à 2σ, 99,7 % à 3σ.");
Q('proba','p3',"Pour X ~ N(m, σ), P(m − 2σ ≤ X ≤ m + 2σ) vaut environ :",["0,95","0,68","0,99","0,5"],"Environ 95 % des valeurs sont à moins de 2 écarts-types de la moyenne.");
Q('proba','p3',"Des tailles suivent N(170, 10) (écart-type 10). Quelle proportion mesure entre 150 et 190 cm ?",["≈ 95 %","≈ 68 %","≈ 99,7 %","≈ 50 %"],"150 et 190 = m ± 2σ.");
Q('proba','p3',"X₁ ~ N(1, 3) et X₂ ~ N(2, 4) indépendantes (écarts-types 3 et 4). Loi de X₁ + X₂ ?",["N(3, 5)","N(3, 7)","N(3, 25)","N(2, 5)"],"Les moyennes s'ajoutent, les variances aussi : √(9 + 16) = 5.");
Q('proba','p3',"Une variable X suit une loi log-normale si :",["ln(X) suit une loi normale","X suit une loi normale de moyenne ln(m)","e^X suit une loi normale","X² suit une loi normale"],"Log-normale : le logarithme de X est normal (X est donc positive).");
Q('proba','p3',"Quelle loi n'a pas d'espérance ?",["La loi de Cauchy","La loi exponentielle","La loi normale","La loi uniforme"],"Pour f(x) = 1/(π(1+x²)), l'intégrale de |x|f(x) diverge.");
Q('proba','p3',"La densité de la loi de Cauchy est :",["1/(π(1 + x²))","e^(−x²/2)/√(2π)","λe^(−λx)","1/(b − a)"],"À retenir pour la reconnaître.");
Q('proba','p3',"La densité de la loi normale centrée réduite est :",["(1/√(2π)) e^(−x²/2)","e^(−x)","(1/2π) e^(−x²)","1/(π(1 + x²))"],"Courbe en cloche de Gauss.");
Q('proba','p3',"Pourquoi la loi normale est-elle si importante ?",["À cause du théorème central limite","Parce qu'elle est discrète","Parce qu'elle n'a pas de variance","Parce que sa densité vaut toujours 1"],"Le TCL dit que les sommes et moyennes de nombreuses variables sont approximativement normales.");
Q('proba','p3',"X continue de densité f. Var(X) se calcule par :",["∫ x² f(x) dx − E(X)²","∫ x f(x) dx","∫ (x f(x))² dx","E(X)² − ∫ x² f(x) dx"],"König-Huygens version intégrale.");
Q('proba','p3',"X ~ E(2). Que vaut P(X > 1) ?",["e^(−2) ≈ 0,135","1 − e^(−2)","2e^(−2)","1/2"],"P(X > t) = e^(−λt) = e^(−2).");

// --- p4 Convergences ---
Q('proba','p4',"Une suite de variables aléatoires (Xₙ) est :",["une suite de fonctions","une suite de nombres réels","une suite d'événements","une tribu"],"Chaque Xₙ est une fonction de Ω dans ℝ. D'où plusieurs notions de convergence.");
Q('proba','p4',"(Xₙ) converge en probabilité vers X si :",["pour tout ε > 0, P(|Xₙ − X| > ε) → 0","Fₙ(x) → F(x) en tout point de continuité","E(|Xₙ − X|²) → 0","P(lim Xₙ ≠ X) = 0"],"Définition de la convergence en probabilité. Les autres sont, dans l'ordre : en loi, en moyenne quadratique, presque sûre.");
Q('proba','p4',"(Xₙ) converge presque sûrement vers X si :",["P({ω : lim Xₙ(ω) ≠ X(ω)}) = 0","P(|Xₙ − X| > ε) → 0","E(Xₙ) → E(X)","Fₙ → F partout"],"Pour presque tout ω, la suite de nombres Xₙ(ω) tend vers X(ω).");
Q('proba','p4',"La convergence en moyenne quadratique correspond à :",["E(|Xₙ − X|²) → 0","E(Xₙ) → E(X)","P(|Xₙ − X| > ε) → 0","Var(Xₙ) → 0"],"Convergence en moyenne d'ordre p avec p = 2.");
Q('proba','p4',"(Xₙ) converge en loi vers X si :",["Fₙ(x) → F(x) en tout point x où F est continue","Xₙ(ω) → X(ω) pour tout ω","P(|Xₙ − X| > ε) → 0","E(Xₙ) = E(X) pour tout n"],"On compare uniquement les fonctions de répartition, aux points de continuité de F.");
Q('proba','p4',"Quelle est la convergence la plus faible ?",["La convergence en loi","La convergence presque sûre","La convergence en moyenne quadratique","La convergence en probabilité"],"Toutes les autres impliquent la convergence en loi.");
Q('proba','p4',"Laquelle de ces implications est vraie ?",["Presque sûre ⇒ en probabilité","En loi ⇒ presque sûre","En probabilité ⇒ presque sûre","En loi ⇒ en moyenne quadratique"],"Hiérarchie : p.s. ⇒ proba ⇒ loi, et quadratique ⇒ proba.");
Q('proba','p4',"La convergence en moyenne quadratique implique :",["la convergence en probabilité","la convergence presque sûre","rien du tout","que Xₙ est constante"],"Quadratique ⇒ moyenne d'ordre 1 ⇒ probabilité ⇒ loi.");
Q('proba','p4',"Pour des v.a. discrètes, la convergence en loi de Xₙ vers X donne :",["P(Xₙ = x) → P(X = x)","Xₙ = X à partir d'un certain rang","E(Xₙ) = 0","P(Xₙ = x) = 0"],"Propriété vue en cours.");
Q('proba','p4',"Le théorème de De Moivre-Laplace dit que si Xₙ ~ B(n, p) :",["(Xₙ − np)/√(np(1−p)) converge en loi vers N(0, 1)","Xₙ converge vers une loi de Poisson","Xₙ/n converge vers 0","(Xₙ − p)/n converge vers N(0, 1)"],"On centre par np et on réduit par l'écart-type √(np(1−p)).");
Q('proba','p4',"Conditions pratiques pour approcher une binomiale par une normale :",["n > 30, np ≥ 5 et n(1 − p) ≥ 5","n ≥ 30 et np < 5","λ > 18","n < 30"],"np < 5 avec n ≥ 30, c'est plutôt Poisson.");
Q('proba','p4',"X ~ B(100 ; 0,5). Par quelle loi normale l'approche-t-on ?",["N(50 ; 5)","N(50 ; 25)","N(100 ; 0,5)","N(0 ; 1)"],"m = np = 50, σ = √(100 × 0,5 × 0,5) = 5.");
Q('proba','p4',"Avec la correction de continuité, P(X = k) (X binomiale) est approchée par :",["P(k − ½ ≤ Y ≤ k + ½) avec Y normale","P(Y = k)","P(Y ≤ k)","P(k ≤ Y ≤ k + 1)"],"On associe à l'entier k l'intervalle ]k − ½ ; k + ½[. P(Y = k) vaudrait 0.");
Q('proba','p4',"Pourquoi fait-on une correction de continuité ?",["Parce qu'on remplace une loi discrète par une loi continue","Parce que la loi normale n'est pas symétrique","Parce que n est trop petit","Pour corriger une erreur de calcul de la variance"],"Une loi continue donne une probabilité nulle aux points isolés : il faut des intervalles.");
Q('proba','p4',"Si Xλ ~ P(λ) et λ → ∞, alors (Xλ − λ)/√λ :",["converge en loi vers N(0, 1)","converge vers 0","converge vers une loi de Poisson P(1)","diverge"],"Approximation normale de la loi de Poisson, satisfaisante pour λ > 18.");
Q('proba','p4',"À partir de quelle valeur de λ approche-t-on P(λ) par une normale (selon le cours) ?",["λ > 18","λ > 1","λ < 5","λ > 100"],"Avec correction de continuité.");
Q('proba','p4',"Le théorème central limite s'applique à une somme de variables :",["indépendantes, de même loi, d'espérance μ et d'écart-type σ finis","toutes de loi normale uniquement","dépendantes","de loi de Cauchy"],"Pas besoin qu'elles soient normales. Il faut une variance finie (Cauchy est exclue).");
Q('proba','p4',"D'après le TCL, la somme Sₙ de n variables i.i.d. (μ, σ) suit approximativement :",["N(nμ ; σ√n)","N(μ ; σ/√n)","N(nμ ; nσ)","N(0 ; 1)"],"Écart-type de la somme : σ√n (variance nσ²).");
Q('proba','p4',"D'après le TCL, la moyenne X̄ₙ de n variables i.i.d. (μ, σ) suit approximativement :",["N(μ ; σ/√n)","N(nμ ; σ√n)","N(μ ; σ)","N(μ ; σ√n)"],"La moyenne se resserre autour de μ quand n grandit.");
Q('proba','p4',"En pratique, à partir de quel n applique-t-on le TCL ?",["n ≥ 30","n ≥ 5","n ≥ 1000","n ≥ 2"],"Règle pratique du cours.");
Q('proba','p4',"On lance 100 dés (μ = 3,5, σ ≈ 1,71). La somme suit approximativement :",["N(350 ; 17,1)","N(3,5 ; 0,171)","N(350 ; 171)","N(100 ; 3,5)"],"nμ = 350, σ√n = 1,71 × 10 = 17,1.");
Q('proba','p4',"Quand n est multiplié par 4, l'écart-type de la moyenne X̄ₙ est :",["divisé par 2","multiplié par 2","divisé par 4","inchangé"],"σ/√n : √4 = 2.");
Q('proba','p4',"Quelle propriété de la loi normale le TCL met-il en évidence ?",["Son universalité","Son absence de variance","Son caractère discret","Son indépendance"],"Quelle que soit la loi de départ, la somme devient presque normale.");
Q('proba','p4',"(Sₙ − nμ)/(σ√n) converge en loi vers :",["N(0, 1)","N(μ, σ)","P(1)","0"],"C'est la version centrée-réduite du TCL.");

// --- p5 Couples et vecteurs ---
Q('proba','p5',"Pour un couple discret, la loi conjointe est donnée par :",["pᵢⱼ = P(X = xᵢ ∩ Y = yⱼ)","pᵢⱼ = P(X = xᵢ) + P(Y = yⱼ)","pᵢⱼ = P(X = xᵢ | Y = yⱼ)","pᵢⱼ = E(XY)"],"C'est la probabilité que les deux valeurs soient prises en même temps.");
Q('proba','p5',"La somme de toutes les probabilités pᵢⱼ d'une loi conjointe vaut :",["1","0","le nombre de cases","E(X) + E(Y)"],"C'est une loi de probabilité.");
Q('proba','p5',"Comment obtient-on la loi marginale de X à partir de la loi conjointe ?",["En sommant pᵢⱼ sur j (la ligne)","En multipliant les pᵢⱼ","En divisant par p•ⱼ","En prenant le maximum de la ligne"],"P(X = xᵢ) = Σⱼ pᵢⱼ = pᵢ•.");
Q('proba','p5',"Formule de la loi conditionnelle de X sachant Y = yⱼ :",["pᵢⱼ / p•ⱼ","pᵢⱼ / pᵢ•","pᵢ• × p•ⱼ","pᵢⱼ × p•ⱼ"],"On divise par la probabilité de la condition, P(Y = yⱼ) = p•ⱼ.");
Q('proba','p5',"X et Y discrètes sont indépendantes si et seulement si :",["pᵢⱼ = pᵢ• × p•ⱼ pour tous i, j","pᵢⱼ = pᵢ• + p•ⱼ","cov(X, Y) = 0","pᵢⱼ = 0 pour i ≠ j"],"Il faut l'égalité pour toutes les cases. cov = 0 ne suffit pas.");
Q('proba','p5',"Tableau : p₀₀ = 0,1 ; p₀₁ = 0,3 ; p₁₀ = 0,2 ; p₁₁ = 0,4 (X en ligne). Que vaut P(X = 0) ?",["0,4","0,1","0,3","0,6"],"Ligne X = 0 : 0,1 + 0,3 = 0,4.");
Q('proba','p5',"Même tableau (p₀₀ = 0,1 ; p₀₁ = 0,3 ; p₁₀ = 0,2 ; p₁₁ = 0,4). X et Y sont-elles indépendantes ?",["Non, car 0,4 × 0,3 = 0,12 ≠ 0,1","Oui, car la somme fait 1","Oui, car toutes les cases sont non nulles","On ne peut pas savoir"],"P(X=0) = 0,4 et P(Y=0) = 0,3 : le produit 0,12 diffère de p₀₀ = 0,1. Une case suffit.");
Q('proba','p5',"Même tableau. Que vaut P(Y = 1 | X = 1) ?",["2/3","0,4","0,7","1/2"],"p₁₁ / P(X = 1) = 0,4 / 0,6 = 2/3.");
Q('proba','p5',"ρ(X, Y) = 0 signifie que X et Y sont :",["non corrélées (pas de lien linéaire)","indépendantes","égales","de même loi"],"Il peut rester un lien non linéaire.");
Q('proba','p5',"cov(X, Y) = 6, σ_X = 2, σ_Y = 4. Que vaut ρ ?",["0,75","3","1,5","0,375"],"6 / (2 × 4) = 0,75.");
Q('proba','p5',"Y = −2X + 3. Que vaut ρ(X, Y) ?",["−1","1","−2","0"],"Relation affine avec une pente négative : ρ = −1.");
Q('proba','p5',"E(Y | X = x) = φ(x). Comment s'appelle φ ?",["la fonction de régression de Y en X","la densité de Y","la loi marginale de X","la covariance"],"Elle donne la valeur moyenne de Y quand X vaut x.");
Q('proba','p5',"E(Y | X) est :",["une variable aléatoire, fonction de X","un nombre réel fixe","une probabilité","une tribu"],"E(Y|X) = φ(X) dépend de la valeur prise par X.");
Q('proba','p5',"Le théorème de l'espérance totale affirme que :",["E[E(Y | X)] = E(Y)","E(Y | X) = E(Y)","E(XY) = E(X)E(Y)","E[E(Y | X)] = E(X)"],"La moyenne des moyennes conditionnelles redonne la moyenne de Y.");
Q('proba','p5',"Pour un couple continu de densité h(x, y), la densité marginale de X est :",["f(x) = ∫ h(x, y) dy","f(x) = ∫ h(x, y) dx","f(x) = h(x, x)","f(x) = ∂h/∂x"],"On intègre la variable qu'on veut faire disparaître (ici y).");
Q('proba','p5',"La fonction de répartition d'un couple (X, Y) est :",["H(x, y) = P(X < x ∩ Y < y)","H(x, y) = P(X < x) + P(Y < y)","H(x, y) = P(X = x, Y = y)","H(x, y) = P(X < y)"],"Probabilité que les deux conditions soient vraies en même temps.");
Q('proba','p5',"La matrice de variance-covariance Σ d'un vecteur aléatoire est :",["symétrique, avec les variances sur la diagonale","diagonale avec des 1","antisymétrique","triangulaire"],"Σᵢⱼ = cov(Xᵢ, Xⱼ) = cov(Xⱼ, Xᵢ), et Σᵢᵢ = Var(Xᵢ).");
Q('proba','p5',"Quelle formule donne la matrice de variance-covariance ?",["Σ = E(XXᵀ) − μμᵀ","Σ = E(X) E(X)ᵀ","Σ = μᵀμ","Σ = E(XᵀX)"],"C'est König-Huygens en version matricielle.");
Q('proba','p5',"Si les Xᵢ sont réduites et deux à deux indépendantes, Σ vaut :",["la matrice identité Iₚ","la matrice nulle","une matrice de 1","μμᵀ"],"Variances 1 sur la diagonale, covariances 0 ailleurs.");
Q('proba','p5',"Si les Xᵢ sont réduites (variance 1), Σ est :",["la matrice de corrélation","la matrice identité dans tous les cas","la matrice nulle","le vecteur des espérances"],"Avec des variances égales à 1, cov(Xᵢ, Xⱼ) = ρᵢⱼ.");
Q('proba','p5',"L'espérance d'un vecteur aléatoire X = (X₁, …, Xₚ) est :",["le vecteur (E(X₁), …, E(Xₚ))","un nombre réel","la somme des E(Xᵢ)","une matrice p × p"],"On prend l'espérance composante par composante.");
Q('proba','p5',"U₁, …, Uₚ i.i.d. de loi N(0, 1). La loi de U₁² + … + Uₚ² est :",["le χ² à p degrés de liberté","la loi N(0, p)","la loi de Student à p ddl","la loi γ₁"],"Définition de la loi du khi-deux.");
Q('proba','p5',"X ~ χ²ₚ. Que valent E(X) et Var(X) ?",["E = p et Var = 2p","E = p et Var = p","E = 0 et Var = 1","E = 2p et Var = p"],"À connaître par cœur.");
Q('proba','p5',"X ~ χ²₃ et Y ~ χ²₅ indépendantes. Loi de X + Y ?",["χ²₈","χ²₁₅","χ²₂","N(8, 16)"],"Les degrés de liberté s'additionnent.");
Q('proba','p5',"Si X est normal de dimension p, de moyenne μ et de covariance Σ inversible, D² = (X − μ)ᵀΣ⁻¹(X − μ) suit :",["χ²ₚ","N(0, 1)","Student à p ddl","γₚ"],"C'est la distance de Mahalanobis au carré.");
Q('proba','p5',"U ~ N(0, 1) et X ~ χ²ₙ indépendantes. La variable U / √(X/n) suit :",["une loi de Student à n degrés de liberté","une loi χ²ₙ","une loi N(0, n)","une loi de Cauchy dans tous les cas"],"Définition de la loi de Student Tₙ.");
Q('proba','p5',"Pour n = 1, la loi de Student est :",["la loi de Cauchy","la loi normale","la loi exponentielle","la loi χ²₁"],"T₁ a pour densité 1/(π(1 + x²)).");
Q('proba','p5',"Tₙ suit une loi de Student, n > 2. Que vaut Var(Tₙ) ?",["n/(n − 2)","1","n","2n"],"E(Tₙ) = 0 (n > 1) et Var(Tₙ) = n/(n − 2) (n > 2).");
Q('proba','p5',"ρ(X, Y) est toujours :",["compris entre −1 et 1","compris entre 0 et 1","positif","supérieur à la covariance"],"L'inégalité de Cauchy-Schwarz garantit |ρ| ≤ 1.");
Q('proba','p5',"Deux variables indépendantes ont une corrélation :",["nulle","égale à 1","égale à −1","indéterminée"],"Indépendance ⇒ cov = 0 ⇒ ρ = 0.");
