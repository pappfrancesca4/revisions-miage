// Explications simples (niveau débutant) — Proba
SIMPLE.p1 = `
<p class="lead">Oublie les symboles un instant. Les probabilités, c'est juste une façon <b>organisée</b> de parler du hasard. Le cours met des mots compliqués sur des idées simples. Voici la traduction.</p>

<h3>L'histoire avec un dé</h3>
<p>Tu lances un dé à 6 faces. Tu ne sais pas ce qui va sortir : c'est une <b>expérience aléatoire</b>.</p>
<div class="dict">
<div><span>Ω (oméga), « l'univers »</span><p>La liste de <b>tout ce qui peut sortir</b> : {1, 2, 3, 4, 5, 6}. C'est juste un sac qui contient tous les résultats possibles.</p></div>
<div><span>ω, « un résultat »</span><p>Un seul résultat, par exemple 4.</p></div>
<div><span>Un événement</span><p>Une <b>question qu'on se pose</b> sur le résultat, écrite comme un <b>ensemble</b> de résultats. « Le dé fait un nombre pair » = {2, 4, 6}. C'est un morceau du sac Ω.</p></div>
<div><span>P(A), « la probabilité »</span><p>Un nombre entre 0 et 1 qui dit <b>à quel point A a des chances d'arriver</b>. P(pair) = 3/6 = 0,5.</p></div>
</div>
<div class="key">Ce qu'il faut retenir : <b>un événement est un ensemble</b> (un sous-ensemble de Ω). Ce n'est ni un nombre, ni une probabilité, ni une fonction. Les QCM adorent tester ça.</div>

<h3>Les mots « ou », « et », « pas »</h3>
<p>Avec A = « pair » = {2,4,6} et B = « plus grand que 3 » = {4,5,6} :</p>
<ul>
<li><b>A ou B</b> (au moins un des deux) = on met tout ensemble = {2,4,5,6}. On l'écrit <b>A ∪ B</b> (« union », le symbole ressemble à un U comme… Union).</li>
<li><b>A et B</b> (les deux en même temps) = ce qui est dans les deux = {4,6}. On l'écrit <b>A ∩ B</b> (« intersection »).</li>
<li><b>pas A</b> = tout le reste = {1,3,5}. On l'écrit <b>Ā</b> (« contraire »).</li>
</ul>
<p><b>Ω</b> = « il se passe n'importe quoi » : toujours vrai, c'est l'événement <b>certain</b>. <b>∅</b> (ensemble vide) = « rien du tout » : jamais vrai, c'est l'événement <b>impossible</b>.</p>

<h3>La tribu, sans paniquer</h3>
<p>La « tribu » fait peur, mais c'est juste <b>la liste des questions qu'on a le droit de poser</b>. Pour que cette liste soit cohérente, elle doit respecter 3 règles de bon sens :</p>
<ol>
<li>On a le droit de demander « est-ce qu'il se passe quelque chose ? » → <b>Ω est dans la liste</b>.</li>
<li>Si on peut demander « A ? », on peut demander « pas A ? » → <b>stable par complémentaire</b>.</li>
<li>Si on peut demander A₁, A₂, A₃… (même une infinité dénombrable), on peut demander « A₁ ou A₂ ou A₃ ou… ? » → <b>stable par union dénombrable</b>.</li>
</ol>
<p>Pour un dé, la tribu c'est en général <b>toutes</b> les parties de Ω. Tu n'auras jamais à en construire une compliquée : il faut juste <b>reconnaître ces 3 règles</b> dans un QCM.</p>

<h3>Calculer une probabilité : les règles de base</h3>
<ul>
<li><b>P(Ω) = 1</b> : il se passe forcément quelque chose (100 %).</li>
<li><b>P(∅) = 0</b>.</li>
<li><b>P(pas A) = 1 − P(A)</b>. S'il y a 30 % de chances de pluie, il y a 70 % de chances qu'il ne pleuve pas.</li>
<li><b>P(A ou B) = P(A) + P(B) − P(A et B)</b>. Pourquoi on enlève ? Parce que ce qui est à la fois dans A et dans B, on l'a compté deux fois.<br>Exemple : P(pair) = 3/6, P(&gt;3) = 3/6, P(pair et &gt;3) = 2/6 → P(pair ou &gt;3) = 3/6 + 3/6 − 2/6 = 4/6. Et on vérifie : {2,4,5,6} a bien 4 éléments.</li>
</ul>
<p>Deux événements sont <b>incompatibles</b> s'ils ne peuvent pas arriver ensemble (A ∩ B = ∅). Exemple : « faire 1 » et « faire 6 ». Dans ce cas seulement, P(A ou B) = P(A) + P(B).</p>

<h3>La probabilité conditionnelle : « sachant que »</h3>
<p>Imagine : quelqu'un a lancé le dé, l'a regardé, et te dit seulement « c'est plus grand que 3 ». Quelle est la probabilité que ce soit pair ?</p>
<p>Puisqu'on sait que c'est &gt; 3, il ne reste que {4, 5, 6}. Parmi eux, les pairs sont {4, 6}. Donc <b>2 chances sur 3</b>.</p>
<p>La formule fait exactement ça :</p>
<div class="formula">P(A | B) = P(A et B) / P(B) = (2/6) / (3/6) = 2/3</div>
<p>Le « | » se lit « <b>sachant</b> ». On <b>divise par la probabilité de ce qu'on sait</b> (B), car B devient notre nouveau « monde ».</p>
<div class="key">Astuce mémoire : dans P(A | B), ce qui est <b>après la barre</b> est ce qu'on sait déjà, et c'est <b>par ça qu'on divise</b>.</div>

<h3>Les probabilités totales : découper en cas</h3>
<p>Deux urnes. On choisit une urne au hasard (pile ou face), puis on tire une boule.</p>
<ul><li>Urne A : 3 rouges sur 4.</li><li>Urne B : 1 rouge sur 4.</li></ul>
<p>Probabilité de tirer rouge ? On fait <b>les cas un par un</b> et on additionne :</p>
<div class="formula">P(rouge) = P(urne A) × P(rouge | A) + P(urne B) × P(rouge | B)<br>= ½ × ¾ + ½ × ¼ = 3/8 + 1/8 = ½</div>
<p>Les « cas » (urne A, urne B) doivent couvrir toutes les possibilités sans se chevaucher : c'est ce qu'on appelle un <b>système complet d'événements</b> (une partition).</p>

<h3>Bayes : remonter à la cause</h3>
<p>Maintenant on a tiré une boule <b>rouge</b>. Quelle est la probabilité qu'elle vienne de l'urne A ? On « remonte » de l'effet (rouge) vers la cause (urne A) :</p>
<div class="formula">P(A | rouge) = P(rouge | A) × P(A) / P(rouge) = (¾ × ½) / ½ = ¾</div>
<p>C'est la <b>formule de Bayes</b> : P(A | B) = P(B | A) × P(A) / P(B). Elle sert à <b>inverser</b> le « sachant ».</p>
<ul>
<li><b>P(A)</b> = ce qu'on croyait <b>avant</b> de voir la boule → probabilité <b>a priori</b>.</li>
<li><b>P(A | rouge)</b> = ce qu'on croit <b>après</b> → probabilité <b>a posteriori</b>.</li>
</ul>

<h3>L'indépendance</h3>
<p>Deux événements sont <b>indépendants</b> si savoir l'un ne change rien sur l'autre. Exemple : lancer deux dés différents. Le premier ne dit rien sur le second.</p>
<div class="formula">Indépendants ⇔ P(A et B) = P(A) × P(B)</div>
<div class="trap"><b>Le piège n°1 de tous les QCM</b> : <b>incompatible ≠ indépendant</b>. Au contraire ! « Faire 1 » et « faire 6 » avec <i>un seul</i> dé sont incompatibles. Si je te dis « c'est un 1 », tu sais <b>tout de suite</b> que ce n'est pas un 6. L'information change tout : ils sont donc <b>dépendants</b>.</div>
`;

SIMPLE.p2 = `
<p class="lead">Une <b>variable aléatoire</b>, c'est juste une machine qui transforme le résultat d'une expérience en <b>nombre</b>. Le mot est trompeur : ce n'est pas une variable au sens informatique, c'est une <b>fonction</b>.</p>

<h3>L'exemple qui suit tout le chapitre</h3>
<p>On lance <b>deux pièces</b>. Les résultats possibles : PP, PF, FP, FF. On s'intéresse au <b>nombre de Pile</b>. On appelle ce nombre X.</p>
<div class="tablewrap"><table><tr><th>Résultat</th><td>PP</td><td>PF</td><td>FP</td><td>FF</td></tr><tr><th>X =</th><td>2</td><td>1</td><td>1</td><td>0</td></tr></table></div>
<p>X est une <b>fonction</b> : on lui donne un résultat (PF), elle rend un nombre (1). D'où la définition « X : Ω → ℝ ».</p>
<p>Le mot « <b>mesurable</b> » dans la définition veut juste dire : pour toute question du type « X vaut-il entre a et b ? », on doit pouvoir calculer la probabilité. Dans tous les exemples concrets, c'est automatiquement le cas.</p>

<h3>La loi : le tableau des probabilités</h3>
<p>La <b>loi</b> de X, c'est la liste « valeur → probabilité » :</p>
<div class="tablewrap"><table><tr><th>k</th><td>0</td><td>1</td><td>2</td></tr><tr><th>P(X = k)</th><td>1/4</td><td>2/4 = 1/2</td><td>1/4</td></tr></table></div>
<p>Toutes les probabilités sont ≥ 0 et leur <b>somme fait 1</b>. Toujours.</p>
<p>X est <b>discrète</b> car elle prend des valeurs qu'on peut <b>compter</b> une par une (0, 1, 2). Si elle pouvait prendre n'importe quel nombre à virgule (une taille, un temps), elle serait <b>continue</b> (chapitre suivant).</p>

<h3>L'espérance = la moyenne</h3>
<p>Si tu refais l'expérience des milliers de fois, quelle sera la <b>moyenne</b> de X ? On multiplie chaque valeur par sa probabilité et on additionne :</p>
<div class="formula">E(X) = 0 × ¼ + 1 × ½ + 2 × ¼ = 1</div>
<p>En moyenne, on obtient 1 Pile sur 2 pièces. Logique.</p>
<p><b>Règles de calcul</b> (très demandées) :</p>
<ul>
<li>Si on double et qu'on ajoute 5 : E(2X + 5) = 2 × E(X) + 5. L'espérance suit les opérations « normalement ».</li>
<li>E(X + Y) = E(X) + E(Y) <b>toujours</b>, même si X et Y sont liées.</li>
<li>E(X × Y) = E(X) × E(Y) <b>seulement si</b> X et Y sont indépendantes.</li>
</ul>

<h3>La variance = à quel point ça s'éparpille</h3>
<p>Deux classes ont 10 de moyenne. Dans la première, tout le monde a entre 9 et 11. Dans la seconde, les notes vont de 0 à 20. Même moyenne, mais la seconde est beaucoup plus <b>dispersée</b>. La variance mesure ça.</p>
<div class="formula">Var(X) = E(X²) − [E(X)]²<br>« la moyenne des carrés MOINS le carré de la moyenne »</div>
<p>Calcul pour les pièces : E(X²) = 0² × ¼ + 1² × ½ + 2² × ¼ = 0 + 0,5 + 1 = 1,5. Donc Var(X) = 1,5 − 1² = <b>0,5</b>.</p>
<p>L'<b>écart-type</b> σ = √Var. Il remet la dispersion dans la même unité que X (ici √0,5 ≈ 0,71).</p>
<ul>
<li>La variance est <b>toujours ≥ 0</b> (c'est une moyenne de carrés). Si elle vaut 0, X ne varie jamais : elle est constante.</li>
<li><b>Var(aX + b) = a² × Var(X)</b>. Le « + b » <b>disparaît</b> : décaler toutes les notes de +2 points ne les rend pas plus dispersées. Le a passe au <b>carré</b> parce que la variance est faite de carrés.</li>
</ul>
<div class="trap">Les QCM proposent souvent a²Var(X) + b² ou aVar(X) + b. C'est faux : c'est <b>a²Var(X)</b>, point.</div>

<h3>La covariance = est-ce que X et Y bougent ensemble ?</h3>
<p>cov(X, Y) = E(XY) − E(X)E(Y).</p>
<ul>
<li><b>Positive</b> : quand X est grand, Y a tendance à être grand (taille et poids).</li>
<li><b>Négative</b> : quand X est grand, Y a tendance à être petit.</li>
<li><b>Nulle</b> : pas de tendance <b>linéaire</b>.</li>
</ul>
<p>Formule clé : <b>Var(X + Y) = Var(X) + Var(Y) + 2 cov(X, Y)</b>. Si X et Y sont indépendantes, cov = 0 et il reste juste Var(X) + Var(Y).</p>
<div class="trap">Indépendantes ⇒ covariance nulle. Mais covariance nulle ⇏ indépendantes. Exemple : X vaut −1, 0 ou 1, et Y = X². Y dépend complètement de X, pourtant cov = 0 (le lien est en forme de « U », pas en ligne droite).</div>

<h3>Les lois à reconnaître</h3>
<p>Le plus dur est de savoir <b>quelle loi utiliser</b>. Pose-toi la question « qu'est-ce que je compte ? » :</p>
<div class="dict">
<div><span>Bernoulli B(p)</span><p><b>Une seule</b> tentative : succès (1) ou échec (0). Une pièce, un tir. E = p, Var = p(1−p).</p></div>
<div><span>Binomiale B(n, p)</span><p>Le <b>nombre de succès</b> sur <b>n</b> tentatives indépendantes identiques. « Sur 10 tirs, combien je marque ? » Valeurs 0 à n. E = np, Var = np(1−p).</p></div>
<div><span>Géométrique G(p)</span><p>Le <b>numéro de la tentative</b> du premier succès. « Combien de lancers avant le premier 6 ? » E = 1/p (6 lancers en moyenne pour un 6).</p></div>
<div><span>Hypergéométrique</span><p>Comme la binomiale, mais on tire <b>sans remettre</b> (cartes, boules). Même moyenne que la binomiale, variance un peu plus petite.</p></div>
<div><span>Poisson P(λ)</span><p>Le <b>nombre de fois</b> qu'un événement rare arrive dans un temps donné, quand on connaît la moyenne λ. « Combien de clients en une heure ? » E = Var = λ.</p></div>
<div><span>Uniforme</span><p>Toutes les valeurs ont la même chance (un dé). Pour 1…n : E = (n+1)/2.</p></div>
</div>
<p><b>Calcul type binomiale</b> : X ~ B(4 ; 0,5), P(X = 0) ? Il faut 4 échecs de suite : 0,5 × 0,5 × 0,5 × 0,5 = 0,0625.</p>

<h3>La fonction de répartition F</h3>
<p>F(x) répond à la question « <b>quelle est la probabilité d'être en dessous de x ?</b> ». Elle part de 0 (tout à gauche) et monte jusqu'à 1 (tout à droite), sans jamais redescendre. Pour une variable discrète, elle monte <b>en escaliers</b> (une marche à chaque valeur possible).</p>
<p>Le cours écrit F(x) = P(X &lt; x). Les QCM du prof écrivent parfois P(X ≤ x). Les deux conventions existent ; choisis celle qui est proposée.</p>
`;

SIMPLE.p3 = `
<p class="lead">Jusqu'ici X prenait des valeurs qu'on peut compter (0, 1, 2…). Maintenant X peut prendre <b>n'importe quel nombre</b> dans un intervalle : un temps d'attente, une taille, une température. On dit qu'elle est <b>continue</b>.</p>

<h3>Le problème : une valeur précise a une probabilité nulle</h3>
<p>Quelle est la probabilité qu'une personne mesure <b>exactement</b> 1,7500000000… m ? Zéro : il y a une infinité de tailles possibles. Donc pour une variable continue :</p>
<div class="formula">P(X = a) = 0 pour tout a</div>
<p>On ne parle plus que de probabilité d'<b>intervalles</b> : « entre 1,70 et 1,80 m ». Conséquence pratique : ≤ ou &lt;, c'est pareil.</p>

<h3>La densité f : la forme du tas de sable</h3>
<p>Imagine qu'on verse <b>1 kg de sable</b> le long d'une règle. Là où il y a beaucoup de sable, les valeurs sont fréquentes. La <b>densité f</b> est la <b>hauteur du tas</b> à chaque endroit.</p>
<ul>
<li>La hauteur n'est jamais négative : <b>f(x) ≥ 0</b>.</li>
<li>Il y a 1 kg en tout : <b>l'aire totale sous f vaut 1</b>.</li>
<li>La probabilité d'être entre a et b = <b>la quantité de sable entre a et b</b> = l'aire sous la courbe = <b>∫ₐᵇ f(x) dx</b>.</li>
</ul>
<div class="trap">f(x) n'est <b>pas</b> une probabilité. C'est une hauteur, elle peut dépasser 1. Seule l'<b>aire</b> est une probabilité. Et P(X = a) vaut 0, pas f(a).</div>

<h3>La fonction de répartition F</h3>
<p>F(x) = probabilité d'être en dessous de x = <b>tout le sable à gauche de x</b> = ∫ de −∞ à x de f. Elle monte doucement de 0 à 1, <b>sans escaliers</b> cette fois (elle est continue). Et dériver F redonne f : <b>F′ = f</b>.</p>
<p>Pour un intervalle : <b>P(a ≤ X ≤ b) = F(b) − F(a)</b> (le sable à gauche de b, moins celui à gauche de a).</p>

<h3>Espérance et variance</h3>
<p>Même idée qu'avant, mais les sommes deviennent des intégrales : E(X) = ∫ x f(x) dx. Les règles de calcul (E(aX + b) = aE(X) + b, Var(aX + b) = a²Var(X)) restent <b>identiques</b>.</p>

<h3>Les lois continues à connaître</h3>
<p><b>1. Uniforme sur [a, b]</b> : toutes les valeurs de l'intervalle sont aussi probables. Le tas de sable est plat.</p>
<ul>
<li>Hauteur f = 1/(b − a) (pour que l'aire fasse 1).</li>
<li>E = (a + b)/2 : le milieu. Var = (b − a)²/12.</li>
<li>P(être dans un morceau) = longueur du morceau / longueur totale. Sur [0 ; 2], P(0,5 ≤ X ≤ 1,5) = 1/2.</li>
</ul>
<p><b>2. Exponentielle E(λ)</b> : modélise un <b>temps d'attente</b> ou une <b>durée de vie</b> (avant une panne, avant le prochain bus).</p>
<ul>
<li>E = 1/λ. Si λ = 2 pannes par an, on attend en moyenne 1/2 an.</li>
<li>P(X &gt; t) = e^(−λt) : la probabilité de « survivre » au-delà de t.</li>
<li><b>Sans mémoire</b> : une ampoule qui a déjà tenu 500 h n'est pas « usée ». La probabilité qu'elle tienne encore 100 h est la même que pour une neuve : P(X &gt; s + t | X &gt; s) = P(X &gt; t).</li>
</ul>
<p><b>3. Normale N(m, σ)</b> : la fameuse <b>courbe en cloche</b>. Tailles, erreurs de mesure, notes… La plupart des valeurs sont près de la moyenne m, et c'est de plus en plus rare quand on s'éloigne.</p>
<ul>
<li>Symétrique autour de m : <b>P(X ≤ m) = 0,5</b>, la moitié à gauche, la moitié à droite.</li>
<li><b>Règle 68-95-99,7</b> : 68 % des valeurs sont à moins de 1σ de la moyenne, 95 % à moins de 2σ, 99,7 % à moins de 3σ.</li>
<li><b>Centrer-réduire</b> : U = (X − m)/σ suit N(0, 1). On soustrait la moyenne, puis on divise par l'<b>écart-type</b> (pas la variance !). Ça permet d'utiliser une seule table pour toutes les normales.</li>
</ul>
<div class="trap"><b>Attention à l'écriture</b> : le cours écrit N(m, σ) (écart-type), mais le QCM du prof écrit N(μ, σ²) (variance). Si tu vois un « ² », le 2ᵉ paramètre est la variance.</div>
<p><b>4. Gamma, log-normale, Cauchy</b> : moins centrales. À retenir : Gamma γᵣ a E = Var = r ; log-normale = « le log de X est normal » ; Cauchy n'a <b>même pas de moyenne</b>.</p>
`;

SIMPLE.p4 = `
<p class="lead">Ce chapitre répond à une question : <b>quand n devient grand, qu'est-ce qui se passe ?</b> C'est ce qui justifie qu'on remplace des lois compliquées par la loi normale.</p>

<h3>L'idée générale</h3>
<p>Lance une pièce 10 fois : tu peux avoir 7 Pile (70 %). Lance-la 10 000 fois : tu auras presque exactement 50 %. Le hasard se « stabilise » quand on répète. Les théorèmes de convergence disent précisément <b>comment</b> et <b>vers quoi</b>.</p>

<h3>Les 4 façons de « converger » (du plus fort au plus faible)</h3>
<div class="dict">
<div><span>Presque sûre</span><p>Pour presque chaque scénario possible, la suite de nombres finit par arriver à la limite. La plus exigeante.</p></div>
<div><span>En moyenne quadratique</span><p>L'écart moyen au carré entre Xₙ et X tend vers 0.</p></div>
<div><span>En probabilité</span><p>La probabilité d'être « loin » de X (plus que ε) tend vers 0.</p></div>
<div><span>En loi</span><p>On ne compare que les <b>formes</b> des lois (les fonctions de répartition), pas les valeurs. La plus faible.</p></div>
</div>
<p><b>Ce qu'il faut retenir</b> : toutes les flèches vont <b>vers la convergence en loi</b>.</p>
<div class="formula">presque sûre ⇒ en probabilité ⇒ en loi<br>quadratique ⇒ en probabilité</div>
<p>« En loi ⇒ presque sûre » est toujours <b>faux</b>.</p>

<h3>Le théorème central limite (TCL) : la star</h3>
<p>Prends <b>n'importe quelle</b> variable (un dé, une durée, peu importe sa forme). Additionne-en beaucoup, indépendantes et de même loi. La somme a une forme de <b>cloche</b> (loi normale). C'est pour ça que la loi normale est partout.</p>
<p>Si chaque Xᵢ a une moyenne μ et un écart-type σ :</p>
<ul>
<li>La <b>somme</b> de n variables ≈ N(nμ ; σ√n).</li>
<li>La <b>moyenne</b> de n variables ≈ N(μ ; σ/√n). Elle se <b>resserre</b> autour de μ quand n grandit.</li>
<li>Règle pratique : ça marche dès <b>n ≥ 30</b>.</li>
</ul>
<div class="ex">100 lancers de dé. Un dé : μ = 3,5, σ ≈ 1,71. Somme des 100 : moyenne 350, écart-type 1,71 × √100 = 17,1. Donc la somme est presque toujours entre 350 − 2×17 ≈ 316 et 384.</div>

<h3>Les approximations pratiques</h3>
<p>Calculer une binomiale avec n = 1000, c'est l'enfer. On la remplace par une loi plus simple :</p>
<div class="tablewrap"><table class="laws">
<tr><th>Si on a…</th><th>On remplace par…</th><th>Quand ?</th></tr>
<tr><td>B(n, p) avec p petit</td><td>Poisson P(np)</td><td>n ≥ 30 et np &lt; 5</td></tr>
<tr><td>B(n, p)</td><td>Normale N(np ; √(np(1−p)))</td><td>n &gt; 30, np ≥ 5 et n(1−p) ≥ 5</td></tr>
<tr><td>Poisson P(λ)</td><td>Normale N(λ ; √λ)</td><td>λ &gt; 18</td></tr>
</table></div>
<p>Le passage binomiale → normale s'appelle le <b>théorème de De Moivre-Laplace</b>.</p>

<h3>La correction de continuité</h3>
<p>Une binomiale prend des valeurs entières (0, 1, 2…). La normale est continue : P(Y = 5) = 0 ! Pour ne pas perdre la valeur 5, on la remplace par l'intervalle autour : <b>de 4,5 à 5,5</b>.</p>
<div class="formula">P(X = k) ≈ P(k − ½ ≤ Y ≤ k + ½)</div>
`;

SIMPLE.p5 = `
<p class="lead">On étudie maintenant <b>deux variables à la fois</b> (ou plus). La grande question : <b>sont-elles liées ?</b> Par exemple : les heures de révision et la note.</p>

<h3>Le tableau à double entrée</h3>
<p>X = « a révisé » (0 = non, 1 = oui), Y = « a réussi » (0 = non, 1 = oui). On note la probabilité de chaque combinaison :</p>
<div class="tablewrap"><table>
<tr><th></th><th>Y = 0 (échec)</th><th>Y = 1 (réussite)</th><th>Total ligne</th></tr>
<tr><th>X = 0</th><td>0,1</td><td>0,3</td><td><b>0,4</b></td></tr>
<tr><th>X = 1</th><td>0,2</td><td>0,4</td><td><b>0,6</b></td></tr>
<tr><th>Total colonne</th><td><b>0,3</b></td><td><b>0,7</b></td><td>1</td></tr>
</table></div>
<ul>
<li>Les cases du milieu = la <b>loi conjointe</b> pᵢⱼ (les deux en même temps).</li>
<li>Les totaux en marge = les <b>lois marginales</b> (une seule variable). On les obtient en <b>additionnant la ligne ou la colonne</b>. D'où le nom « marginale » : elles sont écrites dans la marge.</li>
</ul>
<p><b>Loi conditionnelle</b> : P(Y = 1 | X = 1) = case ÷ total de la ligne = 0,4 / 0,6 = 2/3. C'est le même principe que P(A|B) = P(A ∩ B)/P(B).</p>
<p><b>Indépendance</b> : il faudrait que <b>chaque case = produit des deux totaux</b>. Ici 0,4 × 0,3 = 0,12 ≠ 0,1. Une seule case suffit pour conclure : <b>X et Y sont dépendantes</b>.</p>

<h3>La corrélation ρ : un score de −1 à 1</h3>
<p>La covariance dépend des unités (cm, kg…). On la « normalise » en divisant par les écarts-types :</p>
<div class="formula">ρ = cov(X, Y) / (σ_X × σ_Y), toujours entre −1 et 1</div>
<ul>
<li><b>ρ = 1</b> : les points sont parfaitement alignés sur une droite qui <b>monte</b> (Y = aX + b avec a &gt; 0).</li>
<li><b>ρ = −1</b> : parfaitement alignés sur une droite qui <b>descend</b>.</li>
<li><b>ρ = 0</b> : pas de lien <b>en ligne droite</b>. Il peut y avoir un lien en courbe !</li>
</ul>
<div class="trap">Corrélation ≠ causalité. Les ventes de glaces et les noyades sont corrélées (les deux montent l'été), mais les glaces ne causent pas les noyades.</div>

<h3>L'espérance conditionnelle</h3>
<p>E(Y | X = x) = la moyenne de Y <b>quand on sait que</b> X vaut x. Ex. : la note moyenne de ceux qui ont révisé 5 h. Comme ça dépend de x, c'est une fonction φ(x) : la <b>fonction de régression</b>. C'est exactement ce que fait une régression en machine learning.</p>
<p>Théorème de l'<b>espérance totale</b> : la moyenne des moyennes par groupe redonne la moyenne générale. E[E(Y|X)] = E(Y).</p>

<h3>Plusieurs variables : vecteurs et matrice de covariance</h3>
<p>Avec p variables (X₁, …, Xₚ), on range :</p>
<ul>
<li>les moyennes dans un <b>vecteur</b> μ ;</li>
<li>toutes les variances et covariances dans un <b>tableau carré Σ</b> : variances sur la <b>diagonale</b>, covariances ailleurs. Il est <b>symétrique</b> (cov(X₁, X₂) = cov(X₂, X₁)).</li>
</ul>
<p>Si les variables sont indépendantes et de variance 1, Σ est la matrice <b>identité</b> (des 1 sur la diagonale, des 0 ailleurs).</p>

<h3>Deux lois issues de la normale (pour les tests statistiques)</h3>
<ul>
<li><b>Khi-deux χ²ₚ</b> : on prend p normales centrées réduites indépendantes, on les met au carré, on additionne. E = p, Var = 2p.</li>
<li><b>Student Tₙ</b> : une normale divisée par √(χ²ₙ/n). Ressemble à une normale mais avec des « queues » plus épaisses. Avec n = 1, c'est la loi de Cauchy.</li>
</ul>
`;
