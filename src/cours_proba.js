// Résumés détaillés — Outils probabilistes (L. Donati, M1 MIAGE)
SUBJECTS.push({
  id: 'proba',
  name: 'Outils probabilistes',
  short: 'Proba',
  code: 'SMUAGE02',
  chapters: [
{ id: 'p1', title: 'Espace probabilisé', sub: 'Événements, tribus, probabilité, Bayes, indépendance', html: `
<p class="lead">Ce chapitre pose le vocabulaire de base. Tout le reste du cours (variables aléatoires, lois, convergences) repose sur le triplet <b>(Ω, C, P)</b>. Si tu comprends bien ce que sont Ω, une tribu et une probabilité, la moitié des QCM « de définition » deviennent faciles.</p>

<h3>1. Expérience aléatoire et univers</h3>
<p>Une expérience est <b>aléatoire</b> si on ne peut pas prévoir son résultat à l'avance, et si la répéter peut donner un résultat différent.</p>
<div class="def"><b>Univers Ω</b> : l'ensemble de <i>tous</i> les résultats possibles ω de l'expérience.<br>Exemple : lancer d'un dé → Ω = {1, 2, 3, 4, 5, 6}.</div>

<h3>2. Événements</h3>
<div class="def"><b>Événement</b> : un <b>sous-ensemble</b> A de Ω (A ⊂ Ω), qui appartient à la tribu.<br>Exemple : « obtenir un nombre pair » = {2, 4, 6}.</div>
<ul>
<li><b>Événement élémentaire</b> : un singleton {ω}, un seul résultat.</li>
<li><b>Ω</b> est l'événement <b>certain</b>, <b>∅</b> est l'événement <b>impossible</b>.</li>
<li><b>Contraire</b> Ā = Ω \\ A : « A ne se réalise pas ».</li>
<li><b>A ∪ B</b> (union) : « A <i>ou</i> B » (au moins l'un des deux).</li>
<li><b>A ∩ B</b> (intersection) : « A <i>et</i> B » (les deux en même temps).</li>
</ul>
<div class="trap"><b>Piège QCM</b> : un événement n'est <b>pas</b> un nombre, ni une probabilité, ni une fonction. C'est un <b>ensemble</b> de résultats. Et un élément ω de Ω n'est pas un événement : c'est {ω} qui en est un.</div>

<h3>3. Tribu (σ-algèbre)</h3>
<p>On ne peut pas toujours donner une probabilité à <i>toutes</i> les parties de Ω. La tribu C est la liste des parties « mesurables », c'est-à-dire celles dont on pourra calculer la probabilité.</p>
<div class="def"><b>C ⊂ P(Ω) est une tribu</b> si :<br>
1. <b>Ω ∈ C</b><br>
2. <b>stable par complémentaire</b> : A ∈ C ⇒ Ā ∈ C<br>
3. <b>stable par union dénombrable</b> : (Aᵢ) ∈ C ⇒ ⋃ Aᵢ ∈ C</div>
<p><b>Conséquences</b> : ∅ ∈ C (complémentaire de Ω) et C est stable par <b>intersection dénombrable</b> (passage au complémentaire + union).</p>
<div class="ex"><b>Exemples de tribus sur Ω</b> :<br>• {∅, Ω} : la tribu grossière (la plus petite).<br>• P(Ω) : toutes les parties (la plus grande).<br>• {∅, A, Ā, Ω} : la plus petite tribu contenant A.</div>
<p><b>Espace probabilisable</b> : le couple <b>(Ω, C)</b>.</p>
<div class="trap"><b>Piège</b> : « stable par union <i>finie</i> uniquement » ne suffit pas, il faut l'union <b>dénombrable</b>. L'ensemble des singletons n'est pas une tribu (il ne contient ni ∅ ni Ω en général).</div>

<h3>4. Incompatibles et système complet</h3>
<ul>
<li>A et B sont <b>incompatibles</b> si <b>A ∩ B = ∅</b> (ils ne peuvent pas arriver ensemble).</li>
<li>(A₁, …, Aₙ) est un <b>système complet d'événements</b> si c'est une <b>partition</b> de Ω : deux à deux disjoints (Aᵢ ∩ Aⱼ = ∅ pour i ≠ j) <b>et</b> leur réunion vaut Ω.</li>
</ul>
<div class="ex">Pour un dé : {1,2}, {3,4}, {5,6} est un système complet. A et Ā forment toujours un système complet.</div>

<h3>5. Probabilité</h3>
<div class="def"><b>Une probabilité</b> sur (Ω, C) est une application <b>P : C → [0, 1]</b> telle que :<br>
1. <b>P(Ω) = 1</b><br>
2. <b>σ-additivité</b> : pour toute suite (Aₖ) d'événements <b>deux à deux incompatibles</b>, P(⋃ Aₖ) = Σ P(Aₖ).<br>
Le triplet <b>(Ω, C, P)</b> est un <b>espace probabilisé</b>.</div>
<p><b>Propriétés à connaître par cœur :</b></p>
<div class="formula">P(∅) = 0<br>P(Ā) = 1 − P(A)<br>A ⊂ B ⇒ P(A) ≤ P(B)<br>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</div>
<p><b>Formule des probabilités totales</b> : si (Bₖ) est un système complet, alors pour tout A :</p>
<div class="formula">P(A) = Σₖ P(A ∩ Bₖ) = Σₖ P(A | Bₖ) P(Bₖ)</div>
<div class="trap"><b>Piège</b> : P(A) = 0 n'implique <b>pas</b> A = ∅. On dit que A est <b>presque impossible</b>. De même P(A) = 1 n'implique pas A = Ω : A est <b>presque certain</b>. Exemple typique : pour une variable continue, P(X = 3) = 0 alors que l'événement {X = 3} n'est pas vide.</div>

<h3>6. Probabilité conditionnelle</h3>
<div class="def">Si P(B) > 0 : <span class="big">P(A | B) = P(A ∩ B) / P(B)</span><br>C'est la probabilité de A <b>sachant que B est réalisé</b>. On divise par P(B), la condition.</div>
<ul>
<li><b>Règle de multiplication</b> : P(A ∩ B) = P(A | B) P(B) = P(B | A) P(A).</li>
<li><b>Première formule de Bayes</b> : <b>P(A | B) = P(B | A) P(A) / P(B)</b>. Elle permet d'« inverser » le conditionnement.</li>
<li>Si A et B sont incompatibles : P(A | B) = 0.</li>
<li>B fixé (P(B) ≠ 0), <b>P_B : A ↦ P(A | B) est une probabilité</b>. Donc P(Ā | B) = 1 − P(A | B).</li>
</ul>
<p><b>Seconde formule de Bayes</b> (avec un système complet (Bₖ)) :</p>
<div class="formula">P(Bᵢ | A) = P(A | Bᵢ) P(Bᵢ) / Σₖ P(A | Bₖ) P(Bₖ)</div>
<p>Vocabulaire : <b>P(Bᵢ)</b> = probabilité <b>a priori</b> de l'hypothèse Bᵢ ; <b>P(Bᵢ | A)</b> = probabilité <b>a posteriori</b> après avoir observé A ; <b>P(A | Bᵢ)</b> = <b>vraisemblance</b> de l'observation.</p>
<div class="ex"><b>Exemple classique (test médical)</b> : 1 % de malades. Le test est positif chez 99 % des malades et chez 5 % des non-malades. Si le test est positif, quelle est la probabilité d'être malade ?<br>
P(+) = 0,99 × 0,01 + 0,05 × 0,99 = 0,0099 + 0,0495 = 0,0594<br>
P(M | +) = 0,0099 / 0,0594 ≈ <b>0,167</b>. Seulement 17 % ! L'a priori (1 %) pèse énormément.</div>
<div class="trap"><b>Piège</b> : P(A | B) ≠ P(B | A). Dans P(A|B), on divise par P(B), pas par P(A).</div>

<h3>7. Indépendance de deux événements</h3>
<div class="def">A est <b>indépendant</b> de B si P(A | B) = P(A) : savoir que B est arrivé ne change pas les chances de A.<br>Équivalent (et c'est la définition à retenir) : <span class="big">P(A ∩ B) = P(A) P(B)</span></div>
<ul><li>L'indépendance est <b>symétrique</b> : A indépendant de B ⇔ B indépendant de A.</li></ul>
<div class="trap"><b>Piège n°1 des QCM</b> : <b>incompatibles ≠ indépendants</b>. Si A ∩ B = ∅ avec P(A) > 0 et P(B) > 0, alors P(A ∩ B) = 0 ≠ P(A)P(B) : ils sont <b>dépendants</b> ! (Savoir que B est arrivé dit que A n'est pas arrivé.)</div>
<div class="trap"><b>Autre piège</b> : « A et B indépendants ⇔ P(A|B) = P(B|A) » est faux. La bonne condition est P(A|B) = P(A).</div>
`},

{ id: 'p2', title: 'Variables aléatoires discrètes', sub: 'Loi, répartition, espérance, variance, lois usuelles', html: `
<p class="lead">Une variable aléatoire transforme le résultat d'une expérience en <b>nombre</b>. On peut alors calculer une moyenne (espérance), une dispersion (variance) et reconnaître des lois classiques. C'est le chapitre le plus « calculatoire » des QCM.</p>

<h3>1. Pourquoi des variables aléatoires ?</h3>
<p>On a (Ω, C, P) et une application X : Ω → E. On veut donner un sens à « P(X = t) », la probabilité que X prenne la valeur t. On pose :</p>
<div class="formula">P(X = t) = P(X⁻¹({t}))</div>
<p>Il faut donc que X⁻¹({t}) soit un événement, c'est-à-dire qu'il appartienne à la tribu C. D'où la notion de fonction <b>mesurable</b>.</p>

<h3>2. Application mesurable et tribu borélienne</h3>
<div class="def"><b>X : (Ω, C) → (E, T) est mesurable</b> si pour tout A ∈ T, X⁻¹(A) ∈ C.<br>(L'image réciproque de tout ensemble « mesurable » à l'arrivée est un événement au départ.)</div>
<div class="def"><b>Tribu borélienne B</b> : sur ℝ, c'est la tribu <b>engendrée par les intervalles</b>. Elle ne contient pas que des intervalles (le complémentaire ou l'union de deux intervalles n'est pas forcément un intervalle).</div>

<h3>3. Variable aléatoire réelle</h3>
<div class="def"><b>X : Ω → ℝ est une variable aléatoire</b> si X : (Ω, C) → (ℝ, B) est <b>mesurable</b>, c'est-à-dire si pour tout intervalle I, l'ensemble (X ∈ I) appartient à C.<br>Sa <b>loi</b> est P_X(B) = P(X ∈ B) = P(X⁻¹(B)). (ℝ, B, P_X) est un espace probabilisé.</div>
<div class="trap"><b>Piège</b> : une variable aléatoire n'est ni « aléatoire » ni une « variable » au sens informatique ! C'est une <b>fonction</b> (mesurable) de Ω dans ℝ. Ce n'est pas non plus une probabilité.</div>

<h3>4. Variable discrète</h3>
<div class="def">X est <b>discrète</b> si elle prend un nombre <b>fini ou dénombrable</b> de valeurs x₁, x₂, …<br>Sa loi est donnée par les poids <b>pᵢ = P(X = xᵢ)</b>, avec Σ pᵢ = 1.</div>
<div class="ex"><b>Exemple du cours</b> : on lance deux pièces, X = nombre de Pile.<br>Ω = {PP, PF, FP, FF}. X(PP) = 2, X(PF) = X(FP) = 1, X(FF) = 0.<br>
<table><tr><th>k</th><td>0</td><td>1</td><td>2</td></tr><tr><th>P(X = k)</th><td>1/4</td><td>1/2</td><td>1/4</td></tr></table>On la représente par un diagramme en bâtons.</div>

<h3>5. Fonction de répartition</h3>
<div class="def"><b>F(x) = P(X &lt; x)</b> (convention du cours : inégalité <b>stricte</b>). F : ℝ → [0, 1].</div>
<ul>
<li>F est <b>croissante</b> et, pour une v.a. discrète, <b>en escalier</b>.</li>
<li>F(x) = 0 avant la plus petite valeur, F(x) = 1 après la plus grande. En général : limite 0 en −∞ et 1 en +∞.</li>
<li><b>P(a ≤ X &lt; b) = F(b) − F(a)</b>.</li>
</ul>
<div class="ex">Pour les deux pièces : F(x) = 0 si x ≤ 0 ; 1/4 si 0 &lt; x ≤ 1 ; 3/4 si 1 &lt; x ≤ 2 ; 1 si x &gt; 2.</div>
<div class="trap"><b>Piège</b> : F n'est pas « strictement croissante et dérivable » et ne prend pas que les valeurs 0 et 1. Elle est croissante, de limites 0 et 1. Elle n'est jamais décroissante.</div>

<h3>6. Indépendance de deux variables</h3>
<p>X et Y (sur le même espace) sont <b>indépendantes</b> si pour tous boréliens B₁, B₂ : P((X, Y) ∈ B₁ × B₂) = P(X ∈ B₁) · P(Y ∈ B₂).</p>

<h3>7. Espérance</h3>
<div class="def"><b>E(X) = Σ xᵢ P(X = xᵢ)</b> : la moyenne des valeurs pondérée par leurs probabilités.</div>
<div class="formula">E(X + Y) = E(X) + E(Y) <span class="note">(toujours, même si X et Y sont dépendantes)</span><br>E(aX + b) = a E(X) + b<br>E(XY) = E(X) E(Y) <span class="note">seulement si X et Y sont indépendantes</span></div>
<div class="ex">Deux pièces : E(X) = 0 × 1/4 + 1 × 1/2 + 2 × 1/4 = <b>1</b>.</div>

<h3>8. Variance et écart-type</h3>
<div class="def"><b>Var(X) = Σ pᵢ (xᵢ − E(X))² = E[(X − E(X))²] ≥ 0</b><br><b>σ(X) = √Var(X)</b></div>
<div class="formula">Var(X) = E(X²) − [E(X)]² <span class="note">(König-Huygens)</span><br>Var(aX + b) = a² Var(X) <span class="note">(b disparaît : décaler ne change pas la dispersion)</span><br>σ(aX + b) = |a| σ(X)<br>Var(X + Y) = Var(X) + Var(Y) + 2 cov(X, Y)<br>Si X, Y indépendantes : Var(X + Y) = Var(X) + Var(Y)</div>
<p>Var(X) = 0 ⇔ X est <b>constante presque sûrement</b>.</p>
<div class="ex">Deux pièces : E(X²) = 0 × 1/4 + 1 × 1/2 + 4 × 1/4 = 1,5. Var(X) = 1,5 − 1² = <b>0,5</b>. σ ≈ 0,707.</div>
<div class="trap"><b>Pièges</b> : Var(X) = E(X²) − E(X)² et <b>pas</b> E(X)² − E(X²) (ce serait négatif). Var(aX + b) = a²Var(X), <b>pas</b> a²Var(X) + b², ni aVar(X) + b.</div>
<p><b>Inégalité de Bienaymé-Tchebychev</b> : pour tout k > 0,</p>
<div class="formula">P(|X − E(X)| > kσ) ≤ 1/k²</div>
<p>Exemple : la probabilité de s'écarter de plus de 2 écarts-types de la moyenne est au plus 1/4, quelle que soit la loi.</p>

<h3>9. Covariance</h3>
<div class="def"><b>cov(X, Y) = E(XY) − E(X)E(Y) = E[(X − E(X))(Y − E(Y))]</b><br>cov(X, X) = Var(X).</div>
<p><b>Indépendance ⇒ cov = 0</b>, mais la <b>réciproque est fausse</b>.</p>
<div class="ex"><b>Contre-exemple</b> : X uniforme sur {−1, 0, 1} et Y = X². Y dépend totalement de X, pourtant cov(X, Y) = E(X³) − E(X)E(X²) = 0 − 0 = 0.</div>

<h3>10. Moments</h3>
<p>Moment centré d'ordre k : <b>μₖ = E[(X − m)ᵏ]</b>. On a μ₁ = 0 et μ₂ = Var(X).</p>
<ul><li><b>Asymétrie (skewness)</b> : γ₁ = μ₃ / σ³</li><li><b>Aplatissement (kurtosis)</b> : γ₂ = μ₄ / σ⁴</li></ul>

<h3>11. Lois discrètes usuelles</h3>
<div class="tablewrap"><table class="laws">
<tr><th>Loi</th><th>P(X = k)</th><th>E(X)</th><th>Var(X)</th></tr>
<tr><td><b>Uniforme</b> sur {1,…,n}</td><td>1/n</td><td>(n+1)/2</td><td>(n²−1)/12</td></tr>
<tr><td><b>Bernoulli</b> B(p)</td><td>P(1) = p, P(0) = 1−p</td><td>p</td><td>p(1−p)</td></tr>
<tr><td><b>Binomiale</b> B(n; p)</td><td>C(n,k) pᵏ (1−p)ⁿ⁻ᵏ</td><td>np</td><td>np(1−p)</td></tr>
<tr><td><b>Géométrique</b> G(p), k ≥ 1</td><td>p (1−p)ᵏ⁻¹</td><td>1/p</td><td>(1−p)/p²</td></tr>
<tr><td><b>Hypergéométrique</b> H(N,K,n)</td><td>C(K,k) C(N−K,n−k) / C(N,n)</td><td>nK/N</td><td>n (K/N) ((N−K)/N) (N−n)/(N−1)</td></tr>
<tr><td><b>Poisson</b> P(λ)</td><td>e^(−λ) λᵏ / k!</td><td>λ</td><td>λ</td></tr>
</table></div>
<p><b>Quand utiliser laquelle ?</b></p>
<ul>
<li><b>Bernoulli</b> : une seule expérience succès (1) / échec (0).</li>
<li><b>Binomiale</b> : nombre de succès sur <b>n</b> répétitions <b>indépendantes</b> d'une même Bernoulli (tirages <b>avec remise</b>).</li>
<li><b>Géométrique</b> : <b>rang du premier succès</b> (nombre d'essais nécessaires).</li>
<li><b>Hypergéométrique</b> : nombre de boules blanches dans n tirages <b>sans remise</b> dans une urne de N boules dont K blanches. Même espérance que B(n, K/N), mais variance multipliée par (N−n)/(N−1).</li>
<li><b>Poisson</b> : nombre d'occurrences d'un phénomène de fréquence λ connue, pendant un temps donné (appels, pannes, clients…).</li>
</ul>
<div class="ex">X ~ B(4 ; 0,5) : P(X = 0) = 0,5⁴ = <b>0,0625</b>. P(X = 2) = C(4,2) × 0,5⁴ = 6/16 = 0,375.</div>
<p><b>Approximation</b> : pour <b>n ≥ 30 et np &lt; 5</b>, B(n ; p) ≈ P(λ = np).</p>
<div class="trap"><b>Pièges</b> : pour Bernoulli, E(X) = p (pas p(1−p), qui est la variance). Pour Poisson, espérance = variance = λ. Pour la géométrique, E = 1/p : si p = 1/6 (obtenir un 6), il faut en moyenne 6 lancers.</div>
`},

{ id: 'p3', title: 'Variables aléatoires continues', sub: 'Densité, répartition, lois uniforme, exponentielle, normale…', html: `
<p class="lead">Une variable continue peut prendre une infinité non dénombrable de valeurs (un temps, une taille…). On remplace les <b>sommes</b> par des <b>intégrales</b> et les poids pᵢ par une <b>densité</b> f.</p>

<h3>1. Densité de probabilité</h3>
<div class="def">Une v.a. continue X a une <b>densité f</b> qui vérifie :<br>• f(x) ≥ 0 pour tout x<br>• ∫₋∞^+∞ f(x) dx = 1<br>Et : <span class="big">P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx</span> = l'<b>aire sous la courbe</b> entre a et b.</div>
<p>Conséquence : <b>P(X = a) = 0</b> pour tout a. Donc on peut mettre des inégalités larges ou strictes, c'est pareil :</p>
<div class="formula">P(a ≤ X ≤ b) = P(a &lt; X ≤ b) = P(a ≤ X &lt; b) = P(a &lt; X &lt; b)</div>
<div class="trap"><b>Piège</b> : f(x) n'est <b>pas</b> une probabilité. Elle peut valoir plus que 1 (ex. : uniforme sur [0 ; 0,5] → f = 2). Seule l'<b>aire</b> est une probabilité. Et P(X = x) n'est pas f(x) : c'est 0.</div>

<h3>2. Fonction de répartition</h3>
<div class="def"><b>F(x) = P(X &lt; x) = ∫₋∞ˣ f(t) dt</b></div>
<ul>
<li>F est <b>croissante</b>, à valeurs dans [0, 1], de limites 0 et 1.</li>
<li>F est <b>continue</b> sur ℝ (contrairement au cas discret, où elle est en escalier).</li>
<li>Si f est continue, F est dérivable et <b>F′(x) = f(x)</b>.</li>
<li><b>P(a ≤ X &lt; b) = F(b) − F(a)</b>.</li>
</ul>

<h3>3. Espérance et variance</h3>
<div class="formula">E(X) = ∫ x f(x) dx<br>Var(X) = E(X²) − E(X)² = ∫ x² f(x) dx − E(X)²<br>σ(X) = √Var(X)</div>
<p>Mêmes règles que le discret : E(αX) = αE(X), Var(αX) = α²Var(X), E(X + Y) = E(X) + E(Y), et Var(X + Y) = Var(X) + Var(Y) <b>si</b> X et Y sont indépendantes. Ce sont des intégrales généralisées : elles peuvent ne pas converger (voir Cauchy).</p>

<h3>4. Loi uniforme continue U(a, b)</h3>
<div class="def">f(x) = 1/(b − a) sur [a, b], 0 ailleurs.<br><b>E(X) = (a + b)/2</b> ; <b>Var(X) = (b − a)²/12</b></div>
<div class="ex">X ~ U(0, 10) : P(2 ≤ X ≤ 5) = 3/10. E = 5, Var = 100/12 ≈ 8,33.</div>

<h3>5. Loi exponentielle E(λ)</h3>
<div class="def">f(x) = λ e^(−λx) pour x ≥ 0, 0 sinon (λ > 0).<br><b>E(X) = 1/λ</b> ; <b>Var(X) = 1/λ²</b> ; σ = 1/λ<br>F(x) = 1 − e^(−λx), donc <b>P(X > t) = e^(−λt)</b>.</div>
<p><b>Propriété « sans mémoire »</b> : pour t₂ ≥ t₁ ≥ 0, <b>P(T ≥ t₂ | T ≥ t₁) = P(T ≥ t₂ − t₁)</b>. Un composant qui a déjà fonctionné t₁ heures « repart à zéro » : il n'a pas vieilli.</p>
<p>En fiabilité : λ = <b>taux de défaillance</b>, 1/λ = <b>MTBF</b> (Mean Time Between Failures).</p>
<div class="ex">Durée de vie moyenne 1000 h → λ = 0,001. P(durer plus de 2000 h) = e^(−2) ≈ 0,135.</div>

<h3>6. Lois Gamma γᵣ</h3>
<div class="def">f(x) = e^(−x) x^(r−1) / Γ(r) pour x ≥ 0, avec Γ(r) = ∫₀^∞ t^(r−1) e^(−t) dt.<br><b>E(X) = r</b> ; <b>Var(X) = r</b></div>
<ul>
<li>Si X ~ E(λ), alors λX ~ γ₁ (l'exponentielle est un cas particulier).</li>
<li>Si r est entier : loi d'<b>Erlang</b>.</li>
<li>C'est une sorte d'analogue continu de la loi de Poisson.</li>
<li><b>Additivité</b> : X ~ γᵣ, Y ~ γₛ indépendantes ⇒ X + Y ~ γᵣ₊ₛ.</li>
</ul>

<h3>7. Loi normale (Laplace-Gauss)</h3>
<p>La loi la plus importante, surtout à cause du <b>théorème central limite</b>. Elle modélise erreurs de mesure, phénomènes naturels…</p>
<div class="def"><b>X ~ N(m, σ)</b> a pour densité f(x) = 1/(σ√(2π)) · e^(−½((x − m)/σ)²)<br><b>E(X) = m</b> ; <b>σ(X) = σ</b> (donc Var = σ²)<br>Courbe en cloche, <b>symétrique autour de m</b>.</div>
<div class="trap"><b>Attention à la notation !</b> Le cours écrit N(m, σ) avec l'<b>écart-type</b> en 2ᵉ paramètre. Beaucoup de livres (et certains QCM du prof) écrivent N(μ, σ²) avec la <b>variance</b>. Regarde toujours s'il y a un « ² ».</div>
<p><b>Centrer-réduire</b> : si X ~ N(m, σ), alors</p>
<div class="formula">U = (X − m) / σ ~ N(0, 1)</div>
<p>On divise par <b>σ</b> (l'écart-type), pas par σ². U est <b>centrée</b> (E = 0) et <b>réduite</b> (Var = 1). Densité : (1/√(2π)) e^(−x²/2).</p>
<p><b>Symétrie</b> (avec Φ la fonction de répartition de U) :</p>
<div class="formula">P(X ≤ m) = 0,5<br>P(U ≤ −u) = 1 − P(U ≤ u)<br>P(U ≥ u) = 1 − P(U ≤ u)<br>P(|U| ≤ u) = 2Φ(u) − 1</div>
<p><b>Valeurs remarquables</b> :</p>
<div class="formula">P(m − σ ≤ X ≤ m + σ) ≈ 0,68<br>P(m − 2σ ≤ X ≤ m + 2σ) ≈ 0,95<br>P(m − 3σ ≤ X ≤ m + 3σ) ≈ 0,997 (0,998 dans le cours)</div>
<p><b>Additivité</b> : X₁ ~ N(m₁, σ₁), X₂ ~ N(m₂, σ₂) indépendantes ⇒</p>
<div class="formula">X₁ + X₂ ~ N(m₁ + m₂ ; √(σ₁² + σ₂²))</div>
<div class="trap"><b>Piège</b> : ce sont les <b>variances</b> qui s'additionnent, pas les écarts-types. N(1, 3) + N(2, 4) indépendantes = N(3 ; √(9 + 16)) = N(3 ; 5), et pas N(3 ; 7).</div>

<h3>8. Autres lois</h3>
<ul>
<li><b>Log-normale</b> : X suit une loi log-normale si <b>ln(X) ~ N(m, σ)</b>. X est donc toujours positive.</li>
<li><b>Cauchy</b> : f(x) = 1 / (π(1 + x²)). Elle n'a <b>ni espérance ni variance</b> (les intégrales divergent). C'est aussi la loi de Student à 1 degré de liberté.</li>
</ul>
`},

{ id: 'p4', title: 'Convergences et théorèmes limites', sub: 'Types de convergence, De Moivre-Laplace, TCL', html: `
<p class="lead">Une suite de variables aléatoires (Xₙ) est une suite de <b>fonctions</b>. On veut dire qu'elle « tend » vers une variable X. Il y a plusieurs façons de le dire, plus ou moins fortes. Ce chapitre justifie toutes les <b>approximations</b> (binomiale → normale, etc.).</p>

<h3>1. Les quatre types de convergence</h3>
<div class="def"><b>En probabilité</b> : (Xₙ) → X si pour tout ε > 0, <b>P(|Xₙ − X| > ε) → 0</b>.<br>« La probabilité d'être loin de X devient nulle. »</div>
<div class="def"><b>Presque sûre</b> : <b>P({ω : lim Xₙ(ω) ≠ X(ω)}) = 0</b>.<br>« Pour presque tout ω, la suite de nombres Xₙ(ω) converge vers X(ω). »<br>(X = Y presque sûrement si P(X ≠ Y) = 0.)</div>
<div class="def"><b>En moyenne d'ordre p</b> : <b>E(|Xₙ − X|ᵖ) → 0</b>.<br>Avec p = 2 : convergence en <b>moyenne quadratique</b>.</div>
<div class="def"><b>En loi</b> : <b>Fₙ(x) → F(x)</b> en tout point x où F est <b>continue</b>.<br>On ne compare que les <b>lois</b>, pas les valeurs.</div>
<p>Conséquences de la convergence en loi : pour des v.a. discrètes, P(Xₙ = x) → P(X = x) ; avec des densités, fₙ(x) → f(x) (selon le cours).</p>

<h3>2. Hiérarchie (d'après Saporta)</h3>
<div class="formula">presque sûre ⇒ en probabilité ⇒ en loi<br>moyenne quadratique ⇒ moyenne d'ordre 1 ⇒ en probabilité</div>
<p>La convergence <b>en loi est la plus faible</b> : toutes les autres l'impliquent. Les réciproques sont fausses en général.</p>
<div class="trap"><b>Piège</b> : « en loi ⇒ presque sûre » est faux. La flèche va toujours vers la convergence en loi.</div>

<h3>3. Théorème de De Moivre-Laplace</h3>
<div class="def">Si Xₙ ~ B(n, p), alors <span class="big">(Xₙ − np) / √(np(1 − p)) → N(0, 1)</span> en loi.</div>
<p>En pratique : on approche <b>B(n, p) par N(np ; √(np(1−p)))</b> quand <b>n > 30, np ≥ 5 et n(1 − p) ≥ 5</b>.</p>
<p><b>Correction de continuité</b> : on remplace une loi discrète (valeurs isolées) par une loi continue (intervalles). On associe à chaque entier k l'intervalle ]k − ½ ; k + ½[ :</p>
<div class="formula">P(X = k) ≈ P(k − ½ ≤ Y ≤ k + ½)<br>P(X ≤ k) ≈ P(Y ≤ k + ½)</div>
<div class="ex">X ~ B(100 ; 0,5) : np = 50, √(np(1−p)) = 5. P(X ≤ 55) ≈ P(Y ≤ 55,5) = P(U ≤ 1,1) ≈ 0,864.</div>

<h3>4. Convergence de la loi de Poisson</h3>
<div class="def">Si Xλ ~ P(λ) et λ → ∞ : <span class="big">(Xλ − λ) / √λ → N(0, 1)</span></div>
<p>Approximation très satisfaisante pour <b>λ > 18</b>, avec correction de continuité.</p>

<h3>5. Théorème central limite (TCL)</h3>
<div class="def">Soit (Xₙ) des v.a. <b>indépendantes, de même loi</b>, d'espérance μ et d'écart-type σ. On pose Sₙ = X₁ + … + Xₙ. Alors, en loi :<br>
• Sₙ ≈ N(nμ ; σ√n)<br>
• la moyenne X̄ₙ = Sₙ/n ≈ N(μ ; σ/√n)<br>
• <b>(Sₙ − nμ) / (σ√n) → N(0, 1)</b></div>
<p>C'est l'<b>universalité</b> de la loi normale : même si les Xᵢ ne sont <b>pas</b> normales, leur somme ou leur moyenne l'est presque, dès que n est grand. En pratique : <b>n ≥ 30</b>.</p>
<div class="ex">100 lancers de dé : μ = 3,5, Var = 35/12 ≈ 2,92, σ ≈ 1,71. La somme S₁₀₀ ≈ N(350 ; 17,1). La moyenne ≈ N(3,5 ; 0,171).</div>
<div class="trap"><b>Pièges</b> : l'écart-type de la moyenne est σ/√n (il <b>diminue</b> avec n), celui de la somme est σ√n (il augmente). Le TCL n'exige pas que les Xᵢ soient normales, mais il exige qu'elles aient une variance finie (Cauchy est exclue).</div>

<h3>6. Récapitulatif des approximations</h3>
<div class="tablewrap"><table class="laws">
<tr><th>Loi</th><th>Approchée par</th><th>Conditions</th></tr>
<tr><td>B(n, p)</td><td>P(np)</td><td>n ≥ 30 et np &lt; 5</td></tr>
<tr><td>B(n, p)</td><td>N(np ; √(np(1−p)))</td><td>n > 30, np ≥ 5, n(1−p) ≥ 5</td></tr>
<tr><td>P(λ)</td><td>N(λ ; √λ)</td><td>λ > 18</td></tr>
<tr><td>Somme de n v.a. i.i.d.</td><td>N(nμ ; σ√n)</td><td>n ≥ 30 (TCL)</td></tr>
</table></div>
`},

{ id: 'p5', title: 'Couples et vecteurs aléatoires', sub: 'Loi conjointe, marginales, corrélation, χ², Student', html: `
<p class="lead">On étudie maintenant plusieurs variables <b>en même temps</b>. Question centrale : sont-elles liées ? Comment mesurer ce lien ? C'est la base de la régression et du machine learning (matrice de covariance).</p>

<h3>1. Couple de variables aléatoires</h3>
<p>X et Y sur le même espace (Ω, C, P) : (X, Y) : Ω → ℝ² est un <b>couple</b> (ℝ² muni de sa tribu borélienne).</p>
<div class="formula">P((X, Y) ∈ [a, b] × [c, d]) = P((a ≤ X ≤ b) ∩ (c ≤ Y ≤ d))</div>

<h3>2. Cas discret : loi conjointe</h3>
<div class="def"><b>pᵢⱼ = P(X = xᵢ ∩ Y = yⱼ)</b>, avec ΣᵢΣⱼ pᵢⱼ = 1. Dans le cas fini, on la range dans un <b>tableau</b>.</div>

<h3>3. Lois marginales</h3>
<div class="def">Ce sont les lois de X seule et de Y seule. On <b>somme la ligne ou la colonne</b> :<br>
P(X = xᵢ) = Σⱼ pᵢⱼ = <b>pᵢ•</b><br>
P(Y = yⱼ) = Σᵢ pᵢⱼ = <b>p•ⱼ</b></div>
<div class="ex"><table>
<tr><th></th><th>Y = 0</th><th>Y = 1</th><th>loi de X</th></tr>
<tr><th>X = 0</th><td>0,1</td><td>0,3</td><td><b>0,4</b></td></tr>
<tr><th>X = 1</th><td>0,2</td><td>0,4</td><td><b>0,6</b></td></tr>
<tr><th>loi de Y</th><td><b>0,3</b></td><td><b>0,7</b></td><td>1</td></tr>
</table>Indépendance ? 0,4 × 0,3 = 0,12 ≠ 0,1 → <b>X et Y sont dépendantes</b>. Une seule case qui ne marche pas suffit.</div>

<h3>4. Lois conditionnelles</h3>
<div class="formula">P(X = xᵢ | Y = yⱼ) = pᵢⱼ / p•ⱼ<br>P(Y = yⱼ | X = xᵢ) = pᵢⱼ / pᵢ•</div>
<p>On divise la case par le total de la <b>condition</b>.</p>

<h3>5. Indépendance</h3>
<div class="def">X et Y indépendantes ⇔ <b>pᵢⱼ = pᵢ• × p•ⱼ pour tous i, j</b>.<br>Alors toutes les lois conditionnelles sont égales aux lois marginales.</div>

<h3>6. Covariance et corrélation linéaire</h3>
<div class="formula">cov(X, Y) = E(XY) − E(X)E(Y) = E[(X − E(X))(Y − E(Y))]<br>cov(X, X) = Var(X)</div>
<div class="def"><b>Coefficient de corrélation linéaire</b> : <span class="big">ρ = cov(X, Y) / (σ_X σ_Y)</span>, toujours compris entre <b>−1 et 1</b>.</div>
<ul>
<li><b>|ρ| = 1</b> ⇔ il existe une relation <b>affine</b> presque sûre Y = aX + b (a ≠ 0). ρ = 1 si a > 0, ρ = −1 si a &lt; 0.</li>
<li><b>ρ = 0</b> : X et Y sont <b>non corrélées</b>. Ça ne veut <b>pas</b> dire indépendantes (pas de lien <i>linéaire</i>, mais il peut y avoir un lien non linéaire).</li>
<li>Indépendantes ⇒ ρ = 0. La réciproque est fausse.</li>
</ul>
<div class="trap"><b>Pièges</b> : ρ divise par le produit des <b>écarts-types</b> σ_X σ_Y, pas des variances. ρ n'est jamais dans [0, 1] seulement : il peut être négatif. Et corrélation ≠ causalité : |ρ| = 1 ne prouve aucun lien de cause à effet.</div>

<h3>7. Espérance conditionnelle</h3>
<div class="def"><b>E(Y | X = xᵢ) = Σⱼ yⱼ P(Y = yⱼ | X = xᵢ) = Σⱼ yⱼ pᵢⱼ / pᵢ•</b></div>
<p>Comme elle dépend de x, on note E(Y | X = x) = φ(x) : c'est la <b>fonction de régression</b> de Y en X. Puis <b>E(Y | X) = φ(X)</b> est une <b>nouvelle variable aléatoire</b>.</p>
<div class="formula">E(Y₁ + Y₂ | X) = E(Y₁ | X) + E(Y₂ | X)<br><b>Théorème de l'espérance totale : E[E(Y | X)] = E(Y)</b></div>
<div class="note-block">Le diaporama écrit le dénominateur p•ⱼ dans cette formule ; c'est bien pᵢ• = P(X = xᵢ) qu'il faut, puisqu'on conditionne par X.</div>

<h3>8. Couple quelconque (continu)</h3>
<div class="formula">H(x, y) = P(X &lt; x ∩ Y &lt; y)<br>Marginales : F(x) = H(x, +∞), G(y) = H(+∞, y)<br>Densité conjointe : h(x, y) = ∂²H / ∂x∂y<br>Densités marginales : f(x) = ∫ h(x, y) dy, g(y) = ∫ h(x, y) dx</div>

<h3>9. Vecteurs aléatoires</h3>
<div class="def"><b>X = (X₁, …, Xₚ)</b> : un p-uplet de v.a. réelles.<br>Répartition : F(x₁, …, xₚ) = P(X₁ &lt; x₁ ∩ … ∩ Xₚ &lt; xₚ)<br>Espérance : le <b>vecteur μ = (E(X₁), …, E(Xₚ))</b>. Le vecteur X − μ est centré.</div>
<div class="def"><b>Matrice de variance-covariance Σ</b> : matrice p × p <b>symétrique</b>, avec les <b>variances σᵢ² sur la diagonale</b> et les cov(Xᵢ, Xⱼ) ailleurs.<br><b>Σ = E(XXᵀ) − μμᵀ</b></div>
<ul>
<li>Si les Xᵢ sont <b>réduites</b> (variance 1), Σ est la <b>matrice de corrélation</b> (des 1 sur la diagonale, les ρᵢⱼ ailleurs).</li>
<li>Si en plus elles sont deux à deux indépendantes, <b>Σ = Iₚ</b> (identité).</li>
</ul>

<h3>10. Loi du khi-deux χ²ₚ</h3>
<div class="def">Si U₁, …, Uₚ sont <b>indépendantes de loi N(0, 1)</b> : X = U₁² + … + Uₚ² suit la loi du <b>χ² à p degrés de liberté</b>.<br><b>E = p</b> ; <b>Var = 2p</b></div>
<ul>
<li><b>Additivité</b> : χ²ₚ + χ²_q (indépendantes) = χ²ₚ₊_q.</li>
<li>Si X est normal en dimension p, d'espérance μ et de covariance Σ inversible : <b>D² = (X − μ)ᵀ Σ⁻¹ (X − μ) ~ χ²ₚ</b> (distance de Mahalanobis).</li>
</ul>

<h3>11. Loi de Student</h3>
<div class="def">U ~ N(0, 1) et X ~ χ²ₙ <b>indépendantes</b> : <span class="big">Tₙ = U / √(X/n)</span> suit une loi de <b>Student à n degrés de liberté</b>.</div>
<ul>
<li>E(Tₙ) = 0 si n > 1</li>
<li>Var(Tₙ) = n/(n − 2) si n > 2</li>
<li>Pour <b>n = 1</b>, c'est la loi de <b>Cauchy</b>.</li>
</ul>
`}
  ]
});
