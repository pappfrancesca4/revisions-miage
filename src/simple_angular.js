// Explications simples (niveau débutant) — Angular
SIMPLE.a1 = `
<p class="lead">Avant de parler code, il faut comprendre <b>ce qu'on construit</b>. Tout le cours suit un seul fil rouge : une application de gestion de <b>devoirs à rendre</b> (« assignments »).</p>

<h3>Le site web classique vs la SPA</h3>
<p>Sur un site classique, chaque clic charge une <b>nouvelle page</b> depuis le serveur (l'écran clignote). Dans une <b>SPA</b> (Single Page Application, « application d'une seule page »), on charge <b>une seule page</b> au début, puis JavaScript change le contenu à l'écran sans recharger. Gmail, Netflix, Instagram web fonctionnent comme ça.</p>
<p><b>Angular</b> est un outil (un <b>framework</b>) pour construire ces SPA. C'est fait par Google.</p>

<h3>Angular vs React vs Vue</h3>
<p>React et Vue sont des boîtes à outils <b>minimalistes</b> : ils gèrent l'affichage, et tu ajoutes le reste toi-même (navigation, formulaires…). Angular est une <b>maison livrée meublée</b> : routeur, formulaires, client HTTP, tests sont <b>déjà inclus</b>. Plus complet, mais plus lourd et plus compliqué.</p>

<h3>TypeScript, c'est quoi ?</h3>
<p>C'est <b>JavaScript + des types</b>. En JavaScript, une variable peut contenir un nombre puis du texte, et on découvre l'erreur seulement quand le programme plante. En TypeScript, on écrit <code>age: number</code> et l'éditeur te signale l'erreur <b>avant</b> d'exécuter.</p>
<ul>
<li>Le navigateur ne comprend <b>que JavaScript</b>. Donc TypeScript est <b>traduit (« compilé » ou « transpilé ») en JavaScript</b> avant d'être exécuté.</li>
<li>Les types et les <code>interface</code> servent uniquement pendant l'écriture : ils <b>disparaissent</b> dans le JavaScript final.</li>
<li>TypeScript a été créé par <b>Microsoft</b>.</li>
</ul>

<h3>Tout est un composant</h3>
<p>Pense à des <b>briques de LEGO</b>. L'écran de l'appli est découpé en blocs :</p>
<ul>
<li>un bloc « liste des devoirs »,</li>
<li>dedans, un bloc par devoir,</li>
<li>à côté, un bloc « détail du devoir sélectionné ».</li>
</ul>
<p>Chaque bloc est un <b>composant</b>. Il y a un composant tout en haut qui contient tous les autres : le composant <b>racine</b> (App).</p>
<p>Un composant, c'est <b>3 fichiers</b> :</p>
<div class="dict">
<div><span>assignments.ts</span><p>Le <b>cerveau</b> : une classe TypeScript avec les données et les actions (ajouter, supprimer…).</p></div>
<div><span>assignments.html</span><p>Le <b>visage</b> : ce qui s'affiche (le « template »).</p></div>
<div><span>assignments.css</span><p>Les <b>vêtements</b> : le style (couleurs, tailles).</p></div>
</div>
<p>Le <b>@Component({...})</b> au-dessus de la classe est un <b>décorateur</b> : une étiquette qui dit à Angular « cette classe est un composant, voici son nom de balise (<b>selector</b>), son HTML et son CSS ».</p>
<p>Le <b>selector</b> (ex. <code>app-assignments</code>) crée une nouvelle balise HTML. Pour afficher le composant ailleurs, on écrit simplement <code>&lt;app-assignments&gt;&lt;/app-assignments&gt;</code>.</p>

<h3>« Standalone » : chaque composant dit ce dont il a besoin</h3>
<p>Avant, il fallait déclarer tous les composants dans un gros fichier central (<code>@NgModule</code>). Maintenant chaque composant est <b>autonome (standalone)</b> : il liste lui-même ce qu'il utilise dans <code>imports: [...]</code>.</p>
<div class="key">Le bug n°1 en Angular : utiliser un bouton Material, un formulaire, un autre composant… <b>sans l'avoir mis dans <code>imports</code></b>. Angular affiche alors une erreur incompréhensible.</div>

<h3>Comment l'appli démarre</h3>
<p>Le fichier <code>main.ts</code> appelle <b><code>bootstrapApplication(App, appConfig)</code></b> : « lance l'appli en commençant par le composant App, avec cette configuration ». (L'ancienne méthode, avec les modules, était <code>platformBrowserDynamic().bootstrapModule(AppModule)</code>.)</p>

<h3>Les commandes à connaître</h3>
<div class="dict">
<div><span>npm install -g @angular/cli</span><p>Installer l'outil en ligne de commande d'Angular (une fois).</p></div>
<div><span>ng new mon-app</span><p>Créer un nouveau projet.</p></div>
<div><span>npm i</span><p>Télécharger les bibliothèques dont le projet a besoin.</p></div>
<div><span>ng serve</span><p>Lancer l'appli en mode développement sur <code>http://localhost:4200</code>.</p></div>
<div><span>ng g c nom</span><p>Générer un composant (g = generate, c = component). <code>--skip-tests</code> pour ne pas créer le fichier de test.</p></div>
</div>
<p><b>Node.js</b> permet d'exécuter du JavaScript en dehors du navigateur (sur ton ordi ou un serveur). Angular en a besoin pour ses outils. <b>npm</b> est le « magasin d'applis » des bibliothèques JavaScript.</p>
<p><b>Angular Material</b> (<code>ng add @angular/material</code>) : une collection de composants tout faits et jolis (boutons, listes, cartes, formulaires).</p>
`;

SIMPLE.a2 = `
<p class="lead">Un <b>Signal</b> est une variable « intelligente » qui <b>prévient l'écran quand elle change</b>. C'est le cœur des versions récentes d'Angular.</p>

<h3>Le problème à résoudre</h3>
<p>Tu as une variable <code>nombreDeDevoirs = 3</code> affichée à l'écran. Tu ajoutes un devoir, elle passe à 4. Comment l'écran sait-il qu'il doit se mettre à jour ?</p>
<p>Avant, Angular utilisait <b>Zone.js</b> : un espion qui surveillait <b>tout</b> (chaque clic, chaque timer) puis revérifiait <b>tout l'écran</b>. Ça marche, mais c'est lent et compliqué à déboguer.</p>
<p>Avec les Signals, c'est la variable elle-même qui dit « j'ai changé ! », et <b>seuls les morceaux d'écran qui l'utilisent</b> sont mis à jour. Plus rapide, plus précis. Angular 21 est même devenu « <b>zoneless</b> » (sans Zone.js).</p>

<h3>Comment on s'en sert : 3 gestes</h3>
<pre><code>const nom = signal("Leo");     // 1. CRÉER avec une valeur de départ

nom()                           // 2. LIRE : on met des parenthèses !

nom.set("Michel");              // 3. CHANGER la valeur
nom.update(v => v + "!");       //    ou la changer à partir de l'ancienne</code></pre>
<p>Le point qui surprend : pour <b>lire</b> un signal, on l'<b>appelle comme une fonction</b> : <code>nom()</code>. Dans le HTML aussi : <code>{{ nom() }}</code>.</p>
<ul>
<li><b>set</b> = « remplace par cette valeur ».</li>
<li><b>update</b> = « prends l'ancienne valeur et calcule la nouvelle ». Pratique pour ajouter un élément à une liste : <code>liste.update(l => [...l, nouveau])</code>.</li>
</ul>

<h3>computed : une valeur calculée automatiquement</h3>
<pre><code>const prenom = signal("Léa");
const salutation = computed(() => "Bonjour " + prenom());</code></pre>
<p><code>salutation</code> se recalcule <b>toute seule</b> quand <code>prenom</code> change. Comme une cellule Excel avec une formule. On ne peut pas la modifier directement (lecture seule). Elle est calculée seulement quand on en a besoin (« paresseuse ») et gardée en mémoire (« cache »).</p>

<h3>Quand en mettre un ?</h3>
<p>Seulement si la valeur <b>change avec le temps</b> <b>ET</b> que l'<b>écran l'affiche</b> (ou qu'un computed en dépend).</p>
<ul>
<li>✅ La liste des devoirs, « est-ce que ça charge ? », le texte de recherche.</li>
<li>❌ Une constante (<code>maxResults = 50</code>), un service injecté.</li>
</ul>
`;

SIMPLE.a3 = `
<p class="lead">Ce chapitre explique comment <b>afficher des données dans le HTML</b>, afficher des choses <b>sous condition</b>, répéter un bloc pour <b>chaque élément d'une liste</b>, et changer le <b>style</b> selon les données.</p>

<h3>Afficher une variable : {{ }}</h3>
<p>Dans le .ts : <code>titre = "Mes devoirs"</code>. Dans le .html : <code>&lt;h1&gt;{{ titre }}&lt;/h1&gt;</code>. Les doubles accolades veulent dire « <b>remplace par la valeur</b> ». C'est l'<b>interpolation</b>. (Avec un signal : <code>{{ titre() }}</code>.)</p>

<h3>Afficher sous condition : @if</h3>
<pre><code>@if (devoir.rendu) {
  &lt;p&gt;✅ Rendu&lt;/p&gt;
} @else {
  &lt;p&gt;⏳ Pas encore rendu&lt;/p&gt;
}</code></pre>
<p>Ça se lit comme du français. C'est la syntaxe <b>moderne</b> (Angular 17+). L'ancienne était <code>*ngIf</code>.</p>

<h3>Répéter pour chaque élément : @for</h3>
<pre><code>@for (devoir of devoirs(); track devoir.nom) {
  &lt;li&gt;{{ devoir.nom }}&lt;/li&gt;
}</code></pre>
<p>« Pour chaque devoir de la liste, affiche une ligne. » Le <b>track</b> est obligatoire : il donne à Angular un identifiant pour reconnaître chaque élément (pour ne redessiner que ce qui change).</p>

<h3>Les « directives » : 3 familles</h3>
<p>Une directive est une instruction spéciale qu'on met dans le HTML.</p>
<div class="dict">
<div><span>Structurelles</span><p>Elles <b>ajoutent ou enlèvent</b> des éléments : @if, @for.</p></div>
<div><span>D'attribut</span><p>Elles <b>changent l'apparence</b> d'un élément existant : [style.color], [class.rendu].</p></div>
<div><span>Composants</span><p>Une directive <b>qui a son propre HTML</b>. Oui, techniquement un composant est une directive.</p></div>
</div>

<h3>Changer le style selon les données</h3>
<p>On veut les devoirs rendus en <b>vert</b>, les autres en <b>rouge</b> :</p>
<pre><code>&lt;div [style.color]="devoir.rendu ? 'green' : 'red'"&gt;</code></pre>
<p>Les crochets <code>[ ]</code> veulent dire « <b>calcule</b> ce qui est entre guillemets ». <code>condition ? a : b</code> = « si condition alors a sinon b ».</p>
<p>Ou avec des classes CSS (mieux si on change plusieurs propriétés à la fois) :</p>
<pre><code>&lt;div [class.rendu]="devoir.rendu" [class.nonRendu]="!devoir.rendu"&gt;</code></pre>
<p>« Ajoute la classe <code>rendu</code> si devoir.rendu est vrai. »</p>

<h3>Directive personnalisée</h3>
<p>Si tu veux le même style à plein d'endroits, tu crées ta propre directive (<code>ng g d rendu</code>) dans le dossier <code>shared</code>, et tu l'utilises comme un attribut : <code>&lt;h2 appRendu&gt;</code>. Modifier la directive modifie tout le projet d'un coup.</p>

<h3>Les pipes : formater l'affichage</h3>
<p><code>{{ devoir.date | date }}</code> : le <b>|</b> fait passer la valeur dans un « tuyau » qui la transforme (ici une date brute devient lisible).</p>
`;

SIMPLE.a4 = `
<p class="lead">Le « binding » (liaison), c'est le <b>câble entre le code TypeScript et l'écran HTML</b>. Il y a 3 sortes de câbles, avec 3 écritures. C'est <b>la</b> question classique des QCM.</p>

<h3>Les 3 câbles</h3>
<div class="dict">
<div><span>[ ] crochets</span><p>Du <b>code vers l'écran</b>. « Donne à cette propriété HTML la valeur de mon code. »<br><code>&lt;button [disabled]="!formulaireValide"&gt;</code></p></div>
<div><span>( ) parenthèses</span><p>De <b>l'écran vers le code</b>. « Quand cet événement arrive, appelle ma méthode. »<br><code>&lt;button (click)="enregistrer()"&gt;</code></p></div>
<div><span>[( )] les deux</span><p>Dans <b>les deux sens</b>. Ce que l'utilisateur tape met à jour la variable, et si la variable change, le champ se met à jour.<br><code>&lt;input [(ngModel)]="nomDevoir"&gt;</code></p></div>
</div>
<div class="key">Moyen mnémotechnique : les <b>crochets [ ]</b> sont une boîte où le code <b>dépose</b> une valeur. Les <b>parenthèses ( )</b> sont des oreilles qui <b>écoutent</b> un événement. <b>[( )]</b> = « banane dans une boîte » : les deux à la fois.</div>
<div class="trap">Pour un clic, c'est <code>(click)</code>. <b>Pas</b> <code>[click]</code>, <b>pas</b> <code>[(click)]</code>, <b>pas</b> <code>bind-event</code>. Et pour <code>[(ngModel)]</code>, il faut avoir importé <b>FormsModule</b>.</div>

<h3>ngOnInit : « au démarrage du composant »</h3>
<p><code>ngOnInit()</code> est une méthode qu'Angular appelle <b>automatiquement</b> quand le composant est créé, juste avant l'affichage. On y prépare les données (par exemple, charger la liste). Pour l'utiliser, la classe « implémente » l'interface <code>OnInit</code>.</p>

<h3>Deux façons de faire un formulaire</h3>
<p><b>1. Template-driven</b> (piloté par le HTML) : simple, pour les petits formulaires. On met <code>[(ngModel)]</code> sur chaque champ.</p>
<pre><code>&lt;form (submit)="onSubmit()"&gt;
  &lt;input [(ngModel)]="nomDevoir" name="nom"&gt;
  &lt;button&gt;Ajouter&lt;/button&gt;
&lt;/form&gt;</code></pre>
<p><b>2. Reactive Forms</b> (piloté par le TypeScript) : pour les formulaires complexes avec validation. On décrit le formulaire dans le code :</p>
<pre><code>profileForm = new FormGroup({          // le formulaire entier
  prenom: new FormControl('', Validators.required),  // un champ obligatoire
  nom: new FormControl('', Validators.required),
});</code></pre>
<p>Puis dans le HTML : <code>[formGroup]="profileForm"</code> sur le form, et <code>formControlName="prenom"</code> sur chaque input. On peut griser le bouton avec <code>[disabled]="profileForm.invalid"</code>.</p>
<div class="dict">
<div><span>FormGroup</span><p>Le formulaire complet (le classeur).</p></div>
<div><span>FormControl</span><p>Un champ (une fiche du classeur).</p></div>
<div><span>Validators.required</span><p>« Ce champ est obligatoire. »</p></div>
</div>
<p><code>#monForm</code> dans le HTML crée une <b>variable de référence</b> : un surnom pour accéder à cet élément ailleurs dans le template.</p>
`;

SIMPLE.a5 = `
<p class="lead">Les composants sont des briques séparées. Mais elles doivent <b>se parler</b> : la liste doit dire au détail quel devoir afficher, et le formulaire doit dire à la liste « j'ai créé un nouveau devoir ». Voici les 3 outils.</p>

<h3>L'image à garder en tête</h3>
<p>Le <b>parent</b> (la liste) contient l'<b>enfant</b> (le détail) dans son HTML. Les données <b>descendent</b> du parent vers l'enfant, les événements <b>remontent</b> de l'enfant vers le parent.</p>

<h3>1. Le parent donne une info à l'enfant : input()</h3>
<p>Côté <b>enfant</b>, on déclare une « boîte aux lettres » :</p>
<pre><code>devoirAffiche = input&lt;Devoir | null&gt;(null);</code></pre>
<p>Côté <b>parent</b>, on y dépose une valeur avec des crochets (comme pour n'importe quelle propriété) :</p>
<pre><code>&lt;app-detail [devoirAffiche]="devoirSelectionne()"&gt;&lt;/app-detail&gt;</code></pre>
<p>L'enfant lit <code>devoirAffiche()</code>. Il <b>ne peut pas le modifier</b> : c'est en lecture seule.</p>
<p>(L'ancienne écriture était <code>@Input() devoirAffiche</code>. Même idée.)</p>

<h3>2. L'enfant prévient le parent : output()</h3>
<p>Côté <b>enfant</b>, on déclare une « sonnette » :</p>
<pre><code>nouveauDevoir = output&lt;Devoir&gt;();
// quand on valide le formulaire :
this.nouveauDevoir.emit(devoir);      // on sonne, avec le devoir</code></pre>
<p>Côté <b>parent</b>, on écoute la sonnette avec des parenthèses (comme un clic) :</p>
<pre><code>&lt;app-ajout (nouveauDevoir)="ajouter($event)"&gt;&lt;/app-ajout&gt;</code></pre>
<p><code>$event</code> contient ce que l'enfant a envoyé (le devoir). (Ancienne écriture : <code>@Output()</code> + <code>EventEmitter</code>.)</p>

<h3>3. Dans les deux sens : model()</h3>
<p>Si l'enfant doit <b>modifier</b> la valeur et que le parent le voie (ex. cocher « rendu »), on utilise <code>model()</code> côté enfant et <code>[( )]</code> côté parent :</p>
<pre><code>// enfant
devoirAffiche = model&lt;Devoir | null&gt;(null);
// parent
&lt;app-detail [(devoirAffiche)]="devoirSelectionne"&gt;</code></pre>

<div class="key">Résumé en une ligne : <b>input = descendre</b>, <b>output = remonter</b>, <b>model = les deux</b>.</div>
`;

SIMPLE.a6 = `
<p class="lead">Un <b>service</b> est un « magasin central » de données et de fonctions, partagé par tous les composants. Et un <b>Observable</b> est une façon de recevoir des données qui arrivent <b>plus tard</b> (d'internet, par exemple).</p>

<h3>Pourquoi un service ?</h3>
<p>Imagine que la liste des devoirs soit rangée <b>dans</b> le composant liste. Le composant « ajout » et le composant « détail » en ont aussi besoin… Problème. Solution : on met les données dans un <b>service</b>, une sorte de <b>bibliothécaire</b> que tous les composants peuvent consulter.</p>
<ul>
<li>Les <b>composants</b> s'occupent de <b>l'affichage</b>.</li>
<li>Les <b>services</b> s'occupent des <b>données</b> et de la <b>logique</b> (et plus tard, de parler au serveur).</li>
</ul>
<pre><code>ng g s assignments.service     # g = generate, s = service</code></pre>
<pre><code>@Injectable({ providedIn: 'root' })
export class AssignmentsService { ... }</code></pre>
<p><b>providedIn: 'root'</b> veut dire : « Angular, crée <b>une seule</b> instance de ce service pour toute l'appli ». Tout le monde partage le même bibliothécaire : c'est un <b>singleton</b>.</p>

<h3>Récupérer le service : inject()</h3>
<p>Dans un composant, on ne fait pas <code>new AssignmentsService()</code> soi-même. On demande à Angular de nous le fournir : c'est l'<b>injection de dépendances</b>.</p>
<pre><code>private service = inject(AssignmentsService);     // façon moderne
// ou, à l'ancienne, dans le constructeur :
constructor(private service: AssignmentsService) {}</code></pre>

<h3>Les Observables : recevoir des données « plus tard »</h3>
<p>Quand on demande des données à un serveur, la réponse n'arrive pas instantanément. Un <b>Observable</b> est comme un <b>abonnement à un journal</b> :</p>
<ul>
<li>Le service <b>publie</b> (l'Observable).</li>
<li>Le composant <b>s'abonne</b> avec <code>.subscribe(...)</code> et dit quoi faire quand les données arrivent.</li>
</ul>
<pre><code>// service
getAssignments(): Observable&lt;Assignment[]&gt; {
  return of(this.assignments);      // of() emballe une valeur dans un Observable
}
// composant
this.service.getAssignments().subscribe(liste => this.assignments = liste);</code></pre>
<p>Les Observables viennent de la bibliothèque <b>RxJS</b>.</p>
<div class="dict">
<div><span>Promesse (JS)</span><p>Un colis livré <b>une seule fois</b>. Ne peut pas être annulé. Simple.</p></div>
<div><span>Observable (RxJS)</span><p>Un abonnement : peut livrer <b>plusieurs fois</b>, peut être <b>annulé</b>, a des <b>opérateurs</b> (map, filter…). Plus puissant, plus lourd.</p></div>
</div>
`;

SIMPLE.a7 = `
<p class="lead">Le <b>routeur</b> donne une <b>adresse (URL)</b> à chaque écran de l'appli, même si c'est une seule page. Comme ça, on peut partager un lien ou utiliser le bouton « retour ».</p>

<h3>Le principe en 3 pièces</h3>
<p><b>1. La table des routes</b> (<code>app.routes.ts</code>) : « telle adresse → tel composant ».</p>
<pre><code>{ path: 'home',           component: Assignments },
{ path: 'add',            component: AddAssignment },
{ path: 'assignment/:id', component: AssignmentDetail },</code></pre>
<p><b>2. L'emplacement d'affichage</b> : la balise <code>&lt;router-outlet&gt;</code> dans le HTML du composant racine. C'est un « cadre photo » vide où Angular met le composant qui correspond à l'URL.</p>
<p><b>3. Les liens</b> : <code>&lt;a routerLink="/add"&gt;Ajouter&lt;/a&gt;</code> (au lieu de <code>href</code>, pour ne pas recharger la page).</p>

<h3>Les adresses avec une partie variable : :id</h3>
<p><code>'assignment/:id'</code> : les <b>deux-points</b> disent « ici il y aura une valeur qui change ». <code>/assignment/1</code>, <code>/assignment/42</code>… même composant, devoir différent.</p>
<div class="trap">La syntaxe est <b>:id</b>. Pas [id], pas ?id, pas {id}. Et c'est <code>path:</code> et <code>component:</code>.</div>
<p>Pour <b>lire</b> ce numéro dans le composant, on utilise <b>ActivatedRoute</b> (« la route active ») :</p>
<pre><code>route = inject(ActivatedRoute);
const id = +this.route.snapshot.params['id'];    // le + transforme "42" en 42</code></pre>
<p><b>snapshot</b> = une « photo » de l'URL au moment où le composant s'ouvre.</p>
<p>Autres infos lisibles dans l'URL : les <b>queryParams</b> (<code>?tri=date</code>) et le <b>fragment</b> (<code>#section2</code>).</p>

<h3>Changer de page depuis le code : Router</h3>
<p>Après avoir enregistré un devoir, on veut revenir à l'accueil :</p>
<pre><code>router = inject(Router);
this.router.navigate(['/home']);</code></pre>
<div class="key">ActivatedRoute = <b>lire</b> l'adresse actuelle. Router = <b>aller</b> à une autre adresse.</div>

<h3>Les guards : le videur à l'entrée</h3>
<p>Un <b>guard</b> (« garde ») vérifie une condition <b>avant</b> de laisser entrer sur une route. Ex. : seul un admin peut ouvrir la page d'édition. Sinon, on le renvoie à l'accueil.</p>
<pre><code>{ path: 'assignment/:id/edit', component: EditAssignment,
  canActivate: [authGuard] }     // « ne laisse entrer que si authGuard dit oui »</code></pre>
<p>Le guard appelle un <b>service d'authentification</b> (est-ce qu'on est connecté ? admin ?) et répond <code>true</code> (entre) ou <code>false</code> (redirection).</p>
`;

SIMPLE.a8 = `
<p class="lead">Jusqu'ici les devoirs étaient écrits en dur dans le code. Maintenant on les stocke dans une <b>vraie base de données en ligne</b>. C'est la stack <b>MEAN</b>.</p>

<h3>MEAN = 4 pièces qui travaillent ensemble</h3>
<p>Imagine un <b>restaurant</b> :</p>
<div class="dict">
<div><span>A = Angular</span><p>La <b>salle</b> : ce que le client voit (l'interface dans le navigateur).</p></div>
<div><span>E = Express</span><p>Le <b>serveur (garçon)</b> qui prend les commandes et les porte en cuisine. C'est l'<b>API</b>.</p></div>
<div><span>N = Node.js</span><p>Le <b>bâtiment</b> où travaille le garçon : ce qui fait tourner JavaScript côté serveur.</p></div>
<div><span>M = MongoDB</span><p>Le <b>frigo</b> : la base de données qui stocke les devoirs (sous forme de documents JSON, c'est du NoSQL).</p></div>
</div>
<p><b>Le trajet d'une donnée</b> : Angular envoie une <b>requête HTTP</b> (« donne-moi les devoirs ») → Express la reçoit → il interroge MongoDB → il renvoie la réponse en <b>JSON</b> → Angular l'affiche.</p>
<div class="key">Le client (Angular) ne touche <b>jamais</b> directement la base. Il passe toujours par l'API Express.</div>

<h3>HttpClient : le téléphone d'Angular</h3>
<p>Pour appeler l'API, Angular utilise <b>HttpClient</b>. On l'active dans <code>app.config.ts</code> avec <code>provideHttpClient()</code>, puis on l'injecte dans le service.</p>
<p>Les 4 opérations (le « <b>CRUD</b> ») correspondent à 4 verbes HTTP :</p>
<div class="tablewrap"><table class="laws">
<tr><th>Action</th><th>Verbe HTTP</th><th>Code</th></tr>
<tr><td><b>C</b>reate (ajouter)</td><td>POST</td><td><code>http.post(url, devoir)</code></td></tr>
<tr><td><b>R</b>ead (lire)</td><td>GET</td><td><code>http.get(url)</code></td></tr>
<tr><td><b>U</b>pdate (modifier)</td><td>PUT</td><td><code>http.put(url, devoir)</code></td></tr>
<tr><td><b>D</b>elete (supprimer)</td><td>DELETE</td><td><code>http.delete(url + '/' + id)</code></td></tr>
</table></div>
<p>Ces méthodes renvoient un <b>Observable</b>. La requête ne part réellement <b>que quand quelqu'un s'abonne</b> (<code>.subscribe</code>).</p>

<h3>Les opérateurs RxJS : une chaîne de traitement</h3>
<p><code>.pipe(...)</code> crée une <b>chaîne de montage</b> : les données passent par plusieurs étapes avant d'arriver au composant.</p>
<div class="dict">
<div><span>map</span><p><b>Transformer</b> chaque donnée (ex. modifier le nom).</p></div>
<div><span>tap</span><p><b>Regarder</b> sans toucher (ex. un console.log pour déboguer).</p></div>
<div><span>catchError</span><p><b>Attraper les erreurs</b> (serveur éteint, mauvaise adresse) pour que l'appli ne plante pas.</p></div>
<div><span>forkJoin</span><p><b>Attendre que plusieurs requêtes</b> soient toutes terminées, puis continuer une seule fois.</p></div>
</div>

<h3>La pagination</h3>
<p>500 devoirs, c'est trop pour un seul écran. On demande au serveur <b>une page à la fois</b> : <code>/api/assignments?page=2&amp;limit=10</code> (« la page 2, 10 devoirs par page »). Côté serveur, un plugin Mongoose (<code>mongoose-aggregate-paginate-v2</code>) fait le travail.</p>
`;

SIMPLE.a9 = `
<p class="lead">« Déployer », c'est <b>mettre l'appli sur internet</b> pour que tout le monde puisse l'utiliser, pas seulement toi sur localhost.</p>

<h3>Mode développement vs mode production</h3>
<ul>
<li><code>ng serve</code> = <b>mode dev</b> : pratique pour coder (rechargement automatique), mais lent et lourd.</li>
<li><code>npm run build</code> = <b>mode production</b> : crée un dossier <b>dist</b> avec des fichiers <b>compressés (minifiés)</b> et optimisés, prêts à être mis en ligne.</li>
</ul>

<h3>Ce qu'il faut sur Render.com</h3>
<p>Render est un hébergeur. On lui donne un dépôt <b>GitHub public</b>, et il lance 2 commandes :</p>
<ol>
<li>la commande de <b>build</b> (ex. <code>npm install</code> puis <code>npm run build</code>) ;</li>
<li>la commande de <b>démarrage</b> (ex. <code>npm run start</code> → <code>node server.js</code>).</li>
</ol>
<p>On déploie <b>deux choses</b> : le back-end (l'API Express) et le front-end (Angular).</p>

<h3>Pourquoi un server.js pour Angular ?</h3>
<p>Le dossier <code>dist</code> n'est qu'un tas de fichiers. Il faut un petit programme qui les <b>envoie</b> aux visiteurs : un mini serveur <b>Express</b>. Il renvoie toujours <code>index.html</code>, quelle que soit l'adresse demandée, parce que c'est Angular (côté navigateur) qui gère les adresses.</p>
<div class="key">Ajouter un fichier <b>.node-version</b> (ex. <code>24.20.0</code>) à la racine, sinon Render risque d'utiliser un Node trop vieux et le build plante.</div>
`;
