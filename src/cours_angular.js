// Résumés détaillés — Angular / MEAN (M. Buffa)
SUBJECTS.push({
  id: 'ng',
  name: 'Angular et MEAN',
  short: 'Angular',
  code: 'SMUAGE07',
  chapters: [
{ id: 'a1', title: 'Angular, TypeScript et premier projet', sub: 'Framework, CLI, Node, Material, standalone', html: `
<p class="lead">Angular est un <b>framework front-end</b> pour créer des <b>Single Page Applications (SPA)</b> à base de composants. Ce chapitre explique ce qu'est Angular, ce qui le distingue de React/Vue, et comment on crée et lance un projet.</p>

<h3>1. Qu'est-ce qu'Angular ?</h3>
<ul>
<li>Framework front-end pour des <b>single page WebApps</b> basées sur des <b>Web Components</b>.</li>
<li>React et Vue sont des « gestionnaires de vues ». Angular, lui, fournit <b>déjà tout</b> : routeur, gestion d'état, tests, formulaires, client HTTP…</li>
<li><b>Angular n'est pas AngularJS</b> (l'ancienne version, complètement différente).</li>
<li>Cross-platform, très bon support des <b>PWA</b>. Mais pour le natif mobile, le standard reste React Native.</li>
<li>Environ <b>une nouvelle version par an</b>. Angular 22 (sept. 2026) : Signal Forms stables, OnPush par défaut, API <code>resource</code> pour charger des données, support MCP expérimental. Angular 21 devient <b>zoneless</b>.</li>
</ul>
<div class="def"><b>Points forts</b> : Web Components, TypeScript (typé), excellent support PWA, CLI qui génère du code, templates puissants, modularisation naturelle, apprécié des développeurs Java.<br>
<b>Points faibles</b> : lourd (build, code généré), loin derrière React en popularité, <b>difficile à déboguer</b> (un module oublié donne des erreurs obscures), pas de « killer app » connue.</div>

<h3>2. TypeScript</h3>
<ul>
<li>Créé par <b>Microsoft</b>. C'est un <b>sur-ensemble typé de JavaScript</b>.</li>
<li>Le navigateur <b>ne peut pas exécuter</b> TypeScript : il est <b>compilé (transpilé) en JavaScript</b>.</li>
<li>Typage <b>statique</b> vérifié à la <b>compilation</b> (JavaScript : typage <b>dynamique</b> à l'exécution).</li>
<li>Les <b>interfaces</b> et <b>types</b> TypeScript <b>disparaissent</b> après compilation (ils n'existent pas en JS).</li>
<li>Les <b>décorateurs</b> (<code>@Component</code>, <code>@Injectable</code>…) sont des fonctions qui ajoutent des <b>métadonnées de configuration</b> à une classe.</li>
</ul>

<h3>3. Architecture en composants</h3>
<p>Une application Angular est un <b>arbre de composants</b>. Chaque composant est une « boîte noire » qui offre une fonctionnalité (liste de tâches, tâche, détail d'une tâche…). Il y a un composant <b>racine</b> (« root », souvent <code>App</code>), des composants <b>parents</b> et des composants <b>enfants</b>.</p>
<div class="def"><b>Un composant = 3 parties</b> (4 avec les tests) :<br>
• une <b>classe TypeScript</b> décorée par <code>@Component</code> (la logique) → <code>app.ts</code><br>
• un <b>template HTML</b> (la vue) → <code>app.html</code><br>
• des <b>styles CSS</b> → <code>app.css</code><br>
• (des tests → <code>app.spec.ts</code>)</div>
<pre><code>@Component({
  selector: 'app-assignments',   // la balise HTML custom
  imports: [MatButtonModule],    // modules utilisés (standalone)
  templateUrl: './assignments.html',
  styleUrl: './assignments.css'
})
export class Assignments { }</code></pre>
<p><b>Standalone components</b> : depuis Angular 14 (par défaut dès 17), un composant déclare lui-même ses dépendances dans <code>imports</code>, <b>sans avoir besoin d'un <code>@NgModule</code></b>. On a ainsi une hiérarchie de composants et aussi de modules (ce que ni Vue ni React n'ont).</p>

<h3>4. Démarrage de l'application</h3>
<p>Dans <code>main.ts</code>, avec les standalone components :</p>
<pre><code>bootstrapApplication(App, appConfig);</code></pre>
<p>L'ancienne façon (avec modules) était <code>platformBrowserDynamic().bootstrapModule(AppModule)</code>. Le composant racine s'affiche à la place de sa balise (ex. <code>&lt;app-root&gt;</code>) dans <code>index.html</code>. La configuration globale (routeur, HttpClient…) est dans <code>app.config.ts</code>.</p>

<h3>5. Outils et création du projet</h3>
<ul>
<li><b>NodeJS et npm</b> à jour, version <b>LTS</b> (pas la toute dernière). Sur Mac, <code>nvm</code> pour gérer les versions.</li>
<li>Éditeur : VS Code (avec Copilot) ou WebStorm.</li>
<li><b>Toujours avoir les devtools ouverts</b> (F12 / Cmd-Option-I) avec « disable cache » activé.</li>
</ul>
<pre><code>npm install -g @angular/cli   # installer la CLI (en admin)
ng version                    # vérifier la version
ng new assignment-app         # créer le projet (PAS en admin)
npm i                         # installer les dépendances
ng serve                      # lancer en mode dev → http://localhost:4200</code></pre>
<p>Si <code>ng serve</code> échoue : <code>ng serve --host 0.0.0.0</code>. Si la création échoue : vider <code>$HOME/.npm</code>. Utiliser git bash plutôt que PowerShell.</p>
<div class="note-block"><b>IA</b> : Angular est très bien supporté par les assistants (Copilot, Claude Code, Cursor…), avec un fichier <code>.github/copilot-instructions.md</code> généré. Conseil du prof : comprendre d'abord comment Angular fonctionne, puis « se doper à l'IA ».</div>

<h3>6. Angular Material</h3>
<pre><code>ng add @angular/material</code></pre>
<p>Bibliothèque de composants graphiques (boutons, formulaires, listes, cartes, tables, dialogues…) avec des thèmes. Pour utiliser un composant Material, il faut <b>importer son module</b> dans le composant (ex. <code>MatButtonModule</code>), puis utiliser <code>&lt;button mat-button&gt;</code>.</p>
<div class="trap"><b>Piège n°1 d'Angular</b> : oublier d'importer un module. Ça casse la compilation avec des erreurs difficiles à lire. Angular est « très capricieux » : parfois il faut relancer <code>ng serve</code>.</div>
`},

{ id: 'a2', title: 'Signals', sub: 'signal, computed, set/update, zoneless', html: `
<p class="lead">Les <b>Signals</b> sont la nouvelle façon de gérer la <b>réactivité</b> en Angular. Ils remplacent progressivement Zone.js. Le prof y insiste beaucoup : à savoir écrire et lire.</p>

<h3>1. Qu'est-ce qu'un Signal ?</h3>
<div class="def">Un Signal est une <b>enveloppe autour d'une valeur</b> qui la rend <b>observable</b> : ses <b>consommateurs</b> sont notifiés chaque fois qu'elle change.</div>
<pre><code>const nom = signal("Leo");          // signal modifiable (writable)
console.log(nom());                  // LIRE : on l'appelle comme une fonction
nom.set("Michel");                   // ÉCRIRE : remplacer la valeur
nom.update(v => v.toUpperCase());    // MODIFIER à partir de l'ancienne valeur</code></pre>
<ul>
<li><b>Lecture</b> : <code>nom()</code> (le « getter »).</li>
<li><b>set(valeur)</b> : remplace la valeur.</li>
<li><b>update(fn)</b> : calcule la nouvelle valeur à partir de l'ancienne (lambda).</li>
<li><b>asReadonly()</b> : produit une version en lecture seule, pour qu'une autre classe ne puisse pas modifier la valeur.</li>
</ul>
<div class="trap"><b>Piège</b> : dans le template, on écrit <code>{{ titre() }}</code> avec les parenthèses pour un signal. Sans signal : <code>{{ titre }}</code>.</div>

<h3>2. Signal calculé (computed)</h3>
<pre><code>const nomMajuscule = computed(() => nom().toUpperCase());</code></pre>
<ul>
<li>C'est un signal <b>en lecture seule</b> qui <b>dérive</b> sa valeur d'autres signaux.</li>
<li>Il est évalué de façon <b>paresseuse</b> (lazy) et son résultat est <b>mis en cache</b> (mémorisé) jusqu'à ce qu'une dépendance change.</li>
</ul>
<pre><code>products = signal&lt;Product[]&gt;([]);
searchQuery = signal('');
filteredProducts = computed(() =>
  this.products().filter(p => p.name.includes(this.searchQuery())));</code></pre>

<h3>3. Pourquoi des Signals ?</h3>
<ul>
<li>Ils stockent une partie de <b>l'état d'un composant</b>.</li>
<li><b>Seuls les éléments qui en dépendent</b> sont recalculés et ré-affichés : mise à jour <b>ciblée</b> et performante.</li>
<li>Angular connaît <b>statiquement le graphe des dépendances</b>.</li>
<li>Avant, Angular utilisait <b>Zone.js</b> qui interceptait tout l'asynchrone pour détecter les changements : coûteux, débogage difficile, incompatible avec des API modernes, bundle plus gros. <b>Angular 21 devient zoneless</b>.</li>
</ul>
<p>Les Signals sont des <b>primitives réactives synchrones</b> (contrairement aux Observables RxJS, asynchrones). Il existe aussi <code>effect()</code> pour exécuter du code quand un signal change.</p>

<h3>4. Quand utiliser (ou pas) un Signal</h3>
<div class="def"><b>Oui</b> : un attribut dont la valeur est <b>MUTABLE</b> (change dans le temps) <b>ET</b> dont des parties du template (ou d'autres computed) <b>DÉPENDENT</b>.<br>
<b>Non</b> : valeurs constantes ou initialisées une seule fois ; dépendances injectées (les services ne changent pas) ; état local ou éphémère.</div>
<pre><code>// ✅ Signals : état réactif affiché dans le template
products = signal&lt;Product[]&gt;([]);
isLoading = signal(false);
// ✅ Attributs classiques : pas de réactivité nécessaire
private readonly productService = inject(ProductService);
readonly maxResults = 50;</code></pre>
<p>Un signal a un coût : c'est un objet réactif qui maintient un graphe de dépendances.</p>
`},

{ id: 'a3', title: 'Composants, directives et styles', sub: 'ng g c, interpolation, @if/@for, [style], [class], directives custom', html: `
<p class="lead">Comment créer un composant, l'afficher, afficher des données dans le template et styler selon des conditions.</p>

<h3>1. Créer un composant avec la CLI</h3>
<pre><code>ng generate component nom      # forme longue
ng g c nom                     # forme courte
ng g c --skip-tests assignments  # sans fichier de test</code></pre>
<p>Pour l'afficher dans un parent : on <b>importe</b> la classe dans le <code>imports</code> du parent, puis on met son <b>sélecteur</b> comme balise dans le template du parent : <code>&lt;app-assignments&gt;&lt;/app-assignments&gt;</code>. Le sélecteur crée un <b>élément HTML personnalisé</b> (un Web Component).</p>

<h3>2. Interpolation (MVVM)</h3>
<pre><code>export class Assignments {
  titre = "Mon application";                 // sans signal
  protected readonly titre2 = signal("Mon app"); // avec signal
}</code></pre>
<pre><code>&lt;p&gt;Titre = {{ titre }}&lt;/p&gt;
&lt;p&gt;Titre = {{ titre2() }}&lt;/p&gt;</code></pre>
<p>Les doubles accolades <code>{{ }}</code> affichent une variable TypeScript dans la vue. Le binding est automatique : c'est le <b>MVVM</b> (Model-View-ViewModel).</p>

<h3>3. Control flow : @if, @else, @for</h3>
<p>Depuis Angular 17, le contrôle de flux est <b>intégré au template</b> (syntaxe <b>recommandée</b>). Il remplace <code>*ngIf</code> et <code>*ngFor</code> (des outils de migration existent).</p>
<pre><code>@if (assignmentTransmis()) {
  &lt;p&gt;{{ assignmentTransmis()?.nom }}&lt;/p&gt;
} @else {
  &lt;p&gt;Aucun devoir sélectionné&lt;/p&gt;
}

@for (assignment of assignments(); track assignment.nom) {
  &lt;mat-list-item&gt;{{ assignment.nom }}&lt;/mat-list-item&gt;
}</code></pre>
<div class="trap"><b>Piège</b> : <code>@for</code> exige un <b>track</b> (identifiant unique pour qu'Angular suive chaque élément). Et le <code>@if</code> évite une erreur quand la donnée est encore <code>undefined</code> au premier affichage.</div>

<h3>4. Les trois sortes de directives</h3>
<div class="def">1. <b>Structurelles</b> : modifient le DOM en ajoutant/retirant des éléments (<code>@if</code>, <code>@for</code>, anciennement <code>*ngIf</code>, <code>*ngFor</code>).<br>
2. <b>D'attribut</b> : changent l'apparence ou le comportement d'un élément (<code>[style.x]</code>, <code>[class.x]</code>, directives custom).<br>
3. <b>Composants</b> : ce sont des directives <b>avec un template</b>.</div>

<h3>5. Style conditionnel</h3>
<pre><code>&lt;div [style.color]="assignment.rendu ? 'green' : 'red'"&gt;
&lt;div [style.color]="getColor(assignment)"&gt;   &lt;!-- via une méthode --&gt;

&lt;div [class.rendu]="assignment.rendu"
     [class.nonRendu]="!assignment.rendu"&gt;</code></pre>
<p><b>Style ou classe ?</b> Réponse classique : <b>class</b> si on doit modifier <b>plusieurs propriétés CSS</b> d'un coup. Attention aux guillemets simples à l'intérieur des doubles. Vérifier dans les devtools que les classes sont bien appliquées.</p>

<h3>6. Directives personnalisées</h3>
<pre><code>cd src/app/shared
ng g d --skip-tests rendu</code></pre>
<p>Utile pour styler le même type d'élément dans <b>plusieurs composants</b> : code plus <b>modulaire et maintenable</b>, on change la directive et tout le projet suit. Convention : les mettre dans <code>src/app/shared</code>. Ne pas oublier de <b>l'importer</b> dans le composant qui l'utilise. On l'applique via son sélecteur, comme un attribut : <code>&lt;h2 appRendu&gt;</code>.</p>

<h3>7. Pipes</h3>
<pre><code>&lt;h3&gt;{{ assignment.dateDeRendu | date }}&lt;/h3&gt;</code></pre>
<p>Un <b>pipe</b> (<code>|</code>) transforme une valeur pour l'affichage (date, majuscules, monnaie…). Il faut importer <code>DatePipe</code> si besoin.</p>
`},

{ id: 'a4', title: 'Data binding et formulaires', sub: '[ ], ( ), [( )], ngModel, Reactive Forms', html: `
<p class="lead">Le binding relie le code TypeScript et le template. Il y a trois syntaxes à connaître par cœur, c'est un grand classique des QCM.</p>

<h3>1. Les trois bindings</h3>
<div class="tablewrap"><table class="laws">
<tr><th>Syntaxe</th><th>Nom</th><th>Sens</th><th>Exemple</th></tr>
<tr><td><code>[ ]</code></td><td>Property / attribute binding</td><td>TS → vue</td><td><code>[disabled]="!ajoutActive()"</code></td></tr>
<tr><td><code>( )</code></td><td>Event binding</td><td>vue → TS</td><td><code>(click)="onSave()"</code></td></tr>
<tr><td><code>[( )]</code></td><td>Two-way binding (« banane dans une boîte »)</td><td>les deux</td><td><code>[(ngModel)]="nomDevoir"</code></td></tr>
</table></div>
<ul>
<li><b>Crochets [ ]</b> : on lie une propriété/attribut HTML à une expression évaluée. Ex. <code>[style.color]</code>, <code>[disabled]</code>.</li>
<li><b>Parenthèses ( )</b> : on écoute un événement : <code>(click)</code>, <code>(keyup)</code>, <code>(submit)</code>.</li>
<li><b>[( )]</b> : binding bidirectionnel. Si on tape dans le champ, la variable change, et toutes les autres vues qui l'affichent aussi. Puissant mais moins performant que l'approche de React (pas de two-way binding).</li>
</ul>
<div class="trap"><b>Pièges</b> : <code>[click]</code> et <code>[(click)]</code> ne sont pas des event bindings valides. C'est <code>(click)</code>. Et <code>[(ngModel)]</code> exige d'<b>importer FormsModule</b> (« T'as pas importé le module Form ! »).</div>

<h3>2. Exemple : bouton activé après un délai</h3>
<pre><code>ajoutActive = signal(false);

ngOnInit(): void {          // interface OnInit, appelée à l'initialisation
  setTimeout(() => this.ajoutActive.set(true), 3000);
}</code></pre>
<pre><code>&lt;button mat-stroked-button [disabled]="!ajoutActive()"&gt;Ajouter&lt;/button&gt;</code></pre>
<p><code>ngOnInit()</code> vient de l'interface <b>OnInit</b> : appelée à la création du composant, <b>avant l'affichage</b>, pour préparer les données.</p>

<h3>3. Template-driven forms</h3>
<pre><code>&lt;form ngForm #assignmentForm (submit)="onSubmit($event)" class="form"&gt;
  &lt;mat-form-field&gt;
    &lt;input matInput [(ngModel)]="nomDevoir" name="assignment-name"&gt;
  &lt;/mat-form-field&gt;
  &lt;button mat-stroked-button&gt;Ajouter&lt;/button&gt;
&lt;/form&gt;</code></pre>
<ul>
<li><code>#assignmentForm</code> est une <b>variable de référence de template</b> qui pointe vers l'élément.</li>
<li>Un <code>name</code> est <b>obligatoire</b> sur un input avec <code>[(ngModel)]</code> dans un form.</li>
<li>Passer <code>#nomAssignment</code> puis <code>onSubmit(nomAssignment.value)</code> marche, mais le binding bidirectionnel est la solution <b>recommandée</b>.</li>
<li>Bonne pratique : créer un <b>modèle</b> <code>assignment.model.ts</code> pour l'objet manipulé.</li>
<li>DatePicker Material : <code>MatDatepickerModule</code> + <code>provideNativeDateAdapter()</code> dans les <code>providers</code>.</li>
</ul>

<h3>4. Reactive Forms</h3>
<p>Formulaire défini <b>principalement dans le fichier TypeScript</b>. Utile pour les formulaires complexes, la validation, la gestion programmatique.</p>
<pre><code>profileForm = new FormGroup({
  prenom: new FormControl('', Validators.required),
  nom: new FormControl('', Validators.required),
});</code></pre>
<pre><code>&lt;form [formGroup]="profileForm" (ngSubmit)="submitProfile()"&gt;
  &lt;input formControlName="prenom"&gt;
  &lt;input formControlName="nom"&gt;
  &lt;button type="submit" [disabled]="profileForm.invalid"&gt;Valider&lt;/button&gt;
&lt;/form&gt;</code></pre>
<ul>
<li><b>FormGroup</b> = le formulaire complet ; <b>FormControl</b> = un champ ; <b>Validators.required</b> = champ obligatoire.</li>
<li><code>[formGroup]</code> relie le form HTML au FormGroup ; <code>formControlName</code> relie chaque champ ; <code>(ngSubmit)</code> appelle une méthode à la soumission.</li>
<li>Propriétés : <code>.valid</code>, <code>.invalid</code>, <code>.value</code> (ex. <code>{prenom: 'Jean', nom: 'Dupont'}</code>), <code>.controls.prenom.invalid</code>.</li>
</ul>
<p><b>Signal Forms</b> : nouvelle façon de faire des formulaires avec les Signals (annoncée en Angular 21 comme expérimentale, stable en Angular 22).</p>
`},

{ id: 'a5', title: 'Communication entre composants', sub: 'input(), output(), model(), @Input/@Output', html: `
<p class="lead">Un parent doit pouvoir envoyer des données à un enfant, et un enfant doit pouvoir prévenir son parent. C'est l'équivalent des « props » et des événements de React/Vue.</p>

<h3>1. Parent → enfant : input()</h3>
<p><b>Ancienne version</b> : décorateur <code>@Input()</code>. <b>Nouvelle version</b> (signaux) : <code>input()</code>.</p>
<pre><code>// assignment-detail.ts (ENFANT)
export class AssignmentDetail {
  assignmentTransmis = input&lt;Assignment | null&gt;(null);
}</code></pre>
<pre><code>&lt;!-- assignments.html (PARENT) --&gt;
&lt;app-assignment-detail [assignmentTransmis]="assignmentSelectionne()"&gt;
&lt;/app-assignment-detail&gt;</code></pre>
<pre><code>&lt;!-- template de l'ENFANT --&gt;
@if (assignmentTransmis()) {
  &lt;p&gt;Nom du devoir : {{ assignmentTransmis()?.nom }}&lt;/p&gt;
}</code></pre>
<ul>
<li><code>input()</code> renvoie un <b>InputSignal</b> : un signal <b>en lecture seule</b>.</li>
<li>La syntaxe de binding côté parent <b>ne change pas</b> (<code>[prop]="valeur"</code>).</li>
</ul>
<div class="trap"><b>Piège</b> : l'enfant <b>ne peut pas modifier</b> un input signal (lecture seule). Une copie modifiable ne changerait rien chez le parent.</div>

<h3>2. Liaison bidirectionnelle : model()</h3>
<pre><code>// ENFANT
assignmentTransmis = model&lt;Assignment | null&gt;(null);</code></pre>
<pre><code>&lt;!-- PARENT : syntaxe two-way --&gt;
&lt;app-assignment-detail [(assignmentTransmis)]="assignmentSelectionne"&gt;</code></pre>
<p><code>model()</code> crée un signal d'input <b>modifiable par l'enfant</b>, avec un two-way binding natif : la modification remonte au parent.</p>

<h3>3. Enfant → parent : output()</h3>
<p><b>Ancienne version</b> : <code>@Output()</code> + <code>EventEmitter</code>. <b>Nouvelle version</b> : <code>output()</code>.</p>
<pre><code>// add-assignment.ts (ENFANT)
nouvelAssignment = output&lt;Assignment&gt;();
onSubmit() {
  this.nouvelAssignment.emit(nouveau);     // émet l'événement avec la donnée
}</code></pre>
<pre><code>&lt;!-- PARENT : on écoute l'événement custom --&gt;
&lt;app-add-assignment (nouvelAssignment)="onNouvelAssignment($event)"&gt;</code></pre>
<pre><code>// PARENT
onNouvelAssignment(nouveau: Assignment) {
  this.assignments.update(list => [...list, nouveau]);
  this.formVisible.set(false);
}</code></pre>
<p><code>$event</code> contient la donnée émise par l'enfant.</p>

<h3>4. Afficher / cacher avec un flag</h3>
<pre><code>formVisible = signal(false);
onAddAssignment() { this.formVisible.set(true); }</code></pre>
<pre><code>@if (formVisible()) { &lt;app-add-assignment ...&gt; }
@else { &lt;button (click)="onAddAssignment()"&gt;Ajouter&lt;/button&gt; ... }</code></pre>

<h3>5. Détail : passer la valeur ou le signal</h3>
<p><code>[assignmentTransmis]="assignmentSelectionne()"</code> (avec parenthèses) transmet la <b>valeur</b> : l'enfant ne peut pas faire <code>set(null)</code>. Sans parenthèses, on transmet la <b>référence du signal</b>, et l'enfant pourrait faire le <code>set</code>.</p>
<div class="note-block"><b>Récap</b> : <b>input()</b> = parent → enfant (lecture seule). <b>output()</b> = enfant → parent (événement). <b>model()</b> = les deux.</div>
`},

{ id: 'a6', title: 'Services, injection et Observables', sub: 'providedIn root, inject(), RxJS, of, subscribe', html: `
<p class="lead">Les composants doivent <b>présenter</b> les données, pas les gérer. Les <b>services</b> fournissent les données et la logique métier, partagées entre composants. Cette notion n'existe pas en React/Vue.</p>

<h3>1. Rôle d'un service</h3>
<ul>
<li>Centraliser la <b>logique métier</b>, l'<b>état partagé</b> et les <b>appels réseau (API REST)</b> pour les réutiliser entre composants.</li>
<li>On peut avoir plusieurs services spécialisés (sources ou types de données différents).</li>
<li>Un service peut <b>utiliser d'autres services</b> (ex. un service de logging injecté dans le service assignments).</li>
</ul>

<h3>2. Créer un service</h3>
<pre><code>cd src/app/shared
ng g s --skip-tests assignments.service    # ng generate service</code></pre>
<pre><code>@Injectable({ providedIn: 'root' })
export class AssignmentsService { ... }</code></pre>
<div class="def"><b>providedIn: 'root'</b> : le service est enregistré à la <b>racine</b> de l'application et instancié comme un <b>singleton</b> unique, partagé par toute l'app. Plus besoin de le déclarer dans <code>providers</code> d'un <code>app.module.ts</code> (c'était le cas avant Angular 17).</div>
<p>Question du prof : « combien d'instances sont créées ? » → <b>une seule</b>.</p>

<h3>3. Injection de dépendances : inject()</h3>
<pre><code>// Nouvelle façon (depuis Angular 14)
private assignmentsService = inject(AssignmentsService);

// Ancienne façon : via le constructeur
constructor(private assignmentsService: AssignmentsService) {}</code></pre>
<p><b>Avantages de inject()</b> : lisibilité et cohérence avec les Signals, héritage plus facile, composabilité (une fonction peut appeler inject). C'est l'équivalent de CDI en Java.</p>
<div class="trap"><b>Piège</b> : quand on déplace le tableau dans le service, ce n'est plus un signal : dans le template on écrit <code>assignments</code> et pas <code>assignments()</code>.</div>

<h3>4. Observables (RxJS)</h3>
<div class="def">Un <b>Observable</b> permet de manipuler des <b>données asynchrones</b>. On s'y <b>abonne</b> (<code>subscribe</code>) : c'est le pattern <b>publish / subscribe</b>. Plusieurs valeurs peuvent être émises dans le temps. Ils viennent de la bibliothèque <b>RxJS</b>.</div>
<div class="tablewrap"><table class="laws">
<tr><th>Observable</th><th>Promesse</th></tr>
<tr><td>Flux qui reste ouvert, plusieurs valeurs</td><td>Se résout une seule fois</td></tr>
<tr><td>Peut être annulé</td><td>Ne peut pas être annulée</td></tr>
<tr><td>Opérateurs (map, filter, pipe…)</td><td>Pas d'opérateurs</td></tr>
<tr><td>Mécanisme lourd (patterns)</td><td>Léger, async/await</td></tr>
<tr><td>Au cœur de HttpClient</td><td>Natif JavaScript</td></tr>
</table></div>
<pre><code>import { Observable, of } from 'rxjs';

getAssignments(): Observable&lt;Assignment[]&gt; {
  return of(this.assignments);     // of() transforme une valeur en Observable
}</code></pre>
<pre><code>// Dans le composant
this.assignmentsService.getAssignments()
  .subscribe(assignments => this.assignments = assignments);</code></pre>

<h3>5. CRUD dans le service</h3>
<pre><code>addAssignment(a: Assignment): Observable&lt;string&gt; {
  this.assignments.push(a);
  this.loggingService.log(a.nom, "ajouté");
  return of("Assignment ajouté");
}
updateAssignment(a: Assignment): Observable&lt;string&gt; { ... }
deleteAssignment(a: Assignment): Observable&lt;string&gt; { ... }</code></pre>
<p>Le composant appelle la méthode puis fait <code>.subscribe(message => ...)</code>. On construit ainsi l'équivalent d'un <b>client REST/CRUD</b> côté front.</p>
<div class="note-block">En mode TypeScript <b>strict</b> (par défaut) : ajouter <code>if (!this.assignmentTransmis) return;</code> en tête de méthode, ou passer <code>strict: false</code> dans <code>tsconfig.json</code>.</div>
`},

{ id: 'a7', title: 'Routeur et guards', sub: 'routes, router-outlet, :id, ActivatedRoute, navigate, canActivate', html: `
<p class="lead">Une SPA n'a qu'une page, mais on veut des <b>URL</b> : pour partager un lien, utiliser l'historique et les flèches du navigateur. Angular fournit un <b>routeur en standard</b> (pas React ni Vue).</p>

<h3>1. Principe</h3>
<p>Le routeur reprend le modèle de navigation du navigateur : taper une URL, cliquer un lien, revenir en arrière. Une « page » est un <b>état affiché</b> associé à une URL.</p>

<h3>2. Déclarer les routes : app.routes.ts</h3>
<pre><code>export const routes: Routes = [
  { path: '', component: Assignments },
  { path: 'home', component: Assignments },
  { path: 'add', component: AddAssignment },
  { path: 'assignment/:id', component: AssignmentDetail },
  { path: 'assignment/:id/edit', component: EditAssignment,
    canActivate: [authGuard] },
];</code></pre>
<p>Depuis Angular 17, ça se passe dans <code>app.routes.ts</code> (fourni via <code>provideRouter(routes)</code> dans <code>app.config.ts</code>).</p>
<div class="trap"><b>Piège</b> : un paramètre dynamique s'écrit <b>:id</b> → <code>'users/:id'</code>. Pas <code>[id]</code>, ni <code>?id</code>, ni <code>{id}</code>. La clé est <code>path</code> (pas <code>url</code> ni <code>href</code>) et <code>component</code> (pas <code>template</code>).</div>

<h3>3. router-outlet et routerLink</h3>
<pre><code>&lt;!-- template du composant racine --&gt;
&lt;nav&gt;&lt;a routerLink="/home"&gt;Accueil&lt;/a&gt;&lt;/nav&gt;
&lt;router-outlet&gt;&lt;/router-outlet&gt;</code></pre>
<ul>
<li><b>&lt;router-outlet&gt;</b> : l'<b>emplacement</b> où s'affiche le composant correspondant à l'URL courante. Plus besoin de <code>@if/@else</code> pour cacher des parties.</li>
<li><b>routerLink</b> : attribut de lien vers une route. Sans le routeur configuré, le navigateur l'ignore simplement (attribut inconnu).</li>
<li>Lien dynamique : <code>&lt;a routerLink="/assignment/{{a.id}}"&gt;</code> ou <code>[routerLink]="['/assignment', a.id]"</code>.</li>
</ul>

<h3>4. Lire le paramètre : ActivatedRoute</h3>
<pre><code>route = inject(ActivatedRoute);
ngOnInit() {
  const id = +this.route.snapshot.params['id'];   // + convertit en nombre
  this.assignmentsService.getAssignment(id).subscribe(a => this.assignment = a);
}</code></pre>
<ul>
<li><b>snapshot</b> : photo de la route à l'instant T. <code>params</code> = éléments présents dans l'URL (<code>/assignment/1</code>).</li>
<li>On peut aussi utiliser <code>snapshot.paramMap</code> ou l'<b>observable</b> <code>paramMap</code> / <code>params</code> si la valeur peut changer sans recréer le composant.</li>
<li><b>queryParams</b> : <code>?nom=x&amp;debug=true</code> → <code>route.snapshot.queryParams</code>. <b>fragment</b> : <code>#edition</code> → <code>route.snapshot.fragment</code> (pour aller à un endroit précis de la page).</li>
</ul>

<h3>5. Navigation programmatique : Router</h3>
<pre><code>router = inject(Router);
onSaveAssignment() {
  this.assignmentsService.updateAssignment(this.assignment)
    .subscribe(() => this.router.navigate(['/home']));
}
// avec queryParams et fragment
this.router.navigate(['/assignment', id, 'edit'],
  { queryParams: { nom: a.nom }, fragment: 'edition' });</code></pre>
<p>Utilisé après un ajout, une suppression ou une modification pour revenir à l'accueil.</p>

<h3>6. Guards : protéger des routes</h3>
<pre><code>ng g s --skip-tests auth.service      # loggedIn, logIn(), logOut(), isAdmin()
ng g guard --skip-tests auth          # choisir CanActivate</code></pre>
<pre><code>export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAdmin().then(admin => {
    if (admin) return true;
    router.navigate(['/home']);
    return false;
  });
};</code></pre>
<div class="def">Un <b>guard</b> vérifie des <b>conditions</b> (authentification, droits) <b>avant d'autoriser</b> l'accès à une route, ou redirige. On l'ajoute avec <code>canActivate: [authGuard]</code> sur la route.</div>
<p>Dans le TP : un <code>mat-slide-toggle</code> pour se dire admin ; sans être loggé, cliquer EDIT renvoie à l'accueil ; le bouton EDIT est grisé si on n'est pas admin (avec un signal).</p>
`},

{ id: 'a8', title: 'MEAN : HttpClient, MongoDB, Express', sub: 'API REST, CRUD HTTP, opérateurs RxJS, pagination', html: `
<p class="lead">On remplace les données en dur par une vraie base <b>MongoDB</b> (dans le cloud), exposée par une <b>API REST</b> écrite en <b>Node.js + Express</b>, et appelée depuis Angular avec <b>HttpClient</b>.</p>

<h3>1. La stack MEAN</h3>
<div class="def"><b>M</b>ongoDB : base de données <b>NoSQL</b> (documents JSON)<br>
<b>E</b>xpress : framework pour écrire l'<b>API serveur</b> sur Node<br>
<b>A</b>ngular : framework <b>front-end SPA</b><br>
<b>N</b>ode.js : environnement d'exécution <b>JavaScript côté serveur</b></div>
<p><b>Circulation des données</b> : le client Angular envoie une <b>requête HTTP REST (JSON)</b> au serveur Express/Node, qui interroge MongoDB et <b>renvoie la réponse JSON</b> à Angular. Angular ne parle <b>jamais directement</b> à la base.</p>

<h3>2. MongoDB Atlas (cloud)</h3>
<ol>
<li>Créer un compte, une organisation et un projet sur mongodb.com.</li>
<li>Créer un <b>cluster</b> (gratuit).</li>
<li><b>Network access</b> : ajouter <code>0.0.0.0/0</code> pour autoriser toutes les IP.</li>
<li><b>Database user</b> : nom + mot de passe.</li>
<li>Récupérer l'<b>URI de connexion</b> (Connect → application) ; retirer les <code>&lt; &gt;</code> autour du mot de passe.</li>
<li>Créer la base <code>assignmentsDB</code> et la collection <code>assignments</code>.</li>
</ol>

<h3>3. L'API Node + Express + Mongoose</h3>
<ul>
<li>Projet <code>api</code> : <code>npm install</code>, mettre l'URI dans <code>server.js</code>, lancer <code>node server.js</code>, tester <code>http://localhost:8010/api/assignments</code>.</li>
<li><b>app.route()</b> d'Express : permet de <b>chaîner</b> GET, POST, PUT, DELETE sur une même URI, plus élégant que <code>app.get</code>/<code>app.post</code> séparés.</li>
<li><b>Mongoose</b> : <b>validation par schéma</b> et génération automatique des requêtes.</li>
</ul>

<h3>4. HttpClient côté Angular</h3>
<pre><code>// app.config.ts (Angular 18+)
providers: [ provideHttpClient(), provideRouter(routes) ]</code></pre>
<pre><code>// assignments.service.ts
private http = inject(HttpClient);
url = "http://localhost:8010/api/assignments";

getAssignments(): Observable&lt;Assignment[]&gt; {
  return this.http.get&lt;Assignment[]&gt;(this.url);
}
getAssignment(id: number): Observable&lt;Assignment | undefined&gt; {
  return this.http.get&lt;Assignment&gt;(this.url + "/" + id);
}
addAssignment(a: Assignment): Observable&lt;any&gt; {
  return this.http.post&lt;Assignment&gt;(this.url, a);       // CREATE
}
updateAssignment(a: Assignment): Observable&lt;any&gt; {
  return this.http.put&lt;Assignment&gt;(this.url, a);        // UPDATE
}
deleteAssignment(a: Assignment): Observable&lt;any&gt; {
  return this.http.delete(this.url + "/" + a._id);      // DELETE
}</code></pre>
<div class="def">Les méthodes de HttpClient renvoient un <b>Observable</b>. La requête n'est <b>envoyée qu'au moment où l'on s'abonne</b> (<code>subscribe</code> ou pipe <code>async</code>). Comme le service renvoyait déjà des Observables avec <code>of()</code>, <b>le composant n'a pas besoin de changer</b>.</div>
<div class="note-block"><b>CRUD ↔ HTTP</b> : Create = POST, Read = GET, Update = PUT, Delete = DELETE.</div>
<p><b>HttpOptions</b> : on peut ajouter des en-têtes (Content-Type <code>application/json</code>, langue, CORS…).</p>

<h3>5. Opérateurs RxJS</h3>
<div class="tablewrap"><table class="laws">
<tr><th>Opérateur</th><th>Rôle</th></tr>
<tr><td><b>pipe</b></td><td>Chaîner plusieurs opérateurs pour traiter un Observable avant de le retourner</td></tr>
<tr><td><b>map</b></td><td>Appliquer une fonction à chaque valeur émise (comme <code>map</code> en JS)</td></tr>
<tr><td><b>tap</b></td><td>Effet de bord sans modifier la valeur : utile pour <b>déboguer</b> (console.log)</td></tr>
<tr><td><b>catchError</b></td><td>Intercepter les Observables en <b>erreur</b> (mauvaise URI, serveur arrêté, permissions…)</td></tr>
<tr><td><b>forkJoin</b></td><td>Attendre que <b>plusieurs</b> Observables soient terminés, puis émettre une fois</td></tr>
</table></div>
<pre><code>getAssignment(id: number) {
  return this.http.get&lt;Assignment&gt;(this.url + "/" + id).pipe(
    map(a => { a.nom += " transformé avec un pipe"; return a; }),
    tap(a => console.log("tap: " + a.nom)),
    catchError(this.handleError&lt;any&gt;('getAssignment id=' + id))
  );
}
private handleError&lt;T&gt;(operation: any, result?: T) {
  return (error: any): Observable&lt;T&gt; => {
    console.log(operation + ' a échoué ' + error.message);
    return of(result as T);
  };
}</code></pre>

<h3>6. Peupler la base et forkJoin</h3>
<p>Générer ~500 assignments JSON (un site de données de test), les mettre dans <code>shared/data.ts</code>, et ajouter <code>peuplerBD()</code>.</p>
<ul>
<li><b>Version naïve</b> : un <code>forEach</code> d'appels <code>addAssignment().subscribe()</code>. Problème : on ne sait pas quand tout est fini.</li>
<li><b>Version forkJoin</b> : on met tous les Observables dans un tableau et on retourne <code>forkJoin(appels)</code>. Le <code>subscribe</code> est appelé <b>une fois que tous les inserts sont faits</b>.</li>
</ul>
<p>Astuce : <code>"resolveJsonModule": true</code> dans <code>tsconfig.app.json</code> permet d'importer du JSON directement.</p>

<h3>7. Pagination</h3>
<ul>
<li>Côté back : plugin <b>mongoose-aggregate-paginate-v2</b> (<code>npm install --save</code>), deux lignes dans le modèle Mongoose.</li>
<li>Paramètres passés en <b>query</b> dans l'URL : <code>?page=2&amp;limit=10</code>.</li>
<li>La réponse contient les documents + des infos (totalDocs, totalPages, hasNextPage…).</li>
<li>Côté front : boutons première/précédente/suivante/dernière, désactivés aux extrémités, ou <b>MatPaginator</b>, <b>Material Table</b>, ou <b>infinite scrolling</b>.</li>
</ul>
`},

{ id: 'a9', title: 'Déploiement sur Render', sub: 'npm run build, dist, server.js Express, .node-version', html: `
<p class="lead">Mettre en ligne le back-end (API) et le front-end (Angular) sur <b>Render.com</b>, à partir d'un dépôt GitHub public.</p>

<h3>1. Prérequis</h3>
<ul>
<li>Projet sur <b>GitHub public</b>, projet Node correct (bon <code>.gitignore</code>).</li>
<li><code>package.json</code> avec les scripts <b>build</b> et <b>start</b>, et <b>toutes</b> les dépendances.</li>
<li>Tester localement : supprimer <code>node_modules</code>, puis <code>npm install</code>, <code>npm run build</code>, <code>npm run start</code>.</li>
</ul>

<h3>2. Back-end</h3>
<p>Sur Render, créer un <b>Web Service</b> lié au repo (option gratuite). Render demande la <b>commande de build</b> (ex. <code>npm install</code>) et la <b>commande de démarrage</b> (ex. <code>node server.js</code> ou <code>npm run start</code>). Les logs s'affichent ; le lien de l'appli est en haut à gauche.</p>

<h3>3. Front-end</h3>
<ul>
<li><code>ng serve</code> = mode <b>développement</b> (un Node qui sert un index.html généré à la volée).</li>
<li><code>npm run build</code> (<code>ng build</code>) crée le dossier <b>dist</b> : une page HTML + JS/CSS <b>minifiés</b>. C'est l'application en mode <b>production</b>.</li>
<li>Il faut un <b>mini serveur web Express</b> pour servir <code>dist</code> :</li>
</ul>
<pre><code>npm install --save express</code></pre>
<pre><code>// server.js à la racine du projet Angular
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname + "/dist/assignment-app/browser"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});
app.listen(process.env.PORT || 8081);</code></pre>
<ul>
<li>Script <b>start</b> du <code>package.json</code> → <code>node server.js</code>.</li>
<li>La route <code>/*</code> renvoie toujours <code>index.html</code> : c'est une SPA, c'est Angular qui gère les URL.</li>
<li><code>process.env.PORT</code> : port fourni par l'hébergeur.</li>
<li>Penser à mettre l'<b>URL du back-end Render</b> dans le service des assignments.</li>
</ul>
<div class="trap"><b>Piège</b> : ajouter un fichier <b>.node-version</b> à la racine (ex. une ligne <code>24.20.0</code>), sinon Render peut utiliser une version de Node trop ancienne et <code>ng build</code> échoue.</div>
`}
  ]
});
