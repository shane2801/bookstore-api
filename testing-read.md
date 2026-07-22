# Architecture de logging (Migration JUL + JCL → Log4j2 centralisé WebSphere)

## 1. Objectif

L’objectif de cette implémentation est de **centraliser tout le logging applicatif dans un moteur unique**, tout en évitant toute dépendance directe à Log4j dans le code applicatif.

Nous voulons :
- Aucun Log4j dans le code ni dans les POM
- Un comportement de logging homogène entre batch et API
- Une configuration centralisée unique
- La possibilité de changer de backend logging sans modifier les applications

---

## 2. Pourquoi centraliser le logging ?

### Problème actuel

Aujourd’hui, le logging est fragmenté :

- Les batchs utilisent `java.util.logging (JUL)`
- Les applications / vendor utilisent `Apache Commons Logging (JCL)`
- Certains composants utilisent encore Log4j v1
- Chaque framework a :
  - ses formats
  - ses configurations
  - ses comportements
  - ses niveaux de logs

Conséquences :
- logs incohérents entre applications
- difficulté de corrélation des incidents
- multiplication des configurations
- dépendance forte aux frameworks dans le code
- migration future compliquée

---

### Bénéfice de la centralisation

La centralisation permet :

- un moteur unique de logging
- un format homogène sur tous les composants
- un contrôle centralisé des niveaux de logs
- une configuration unique (`log4j2.xml`)
- aucun impact applicatif lors d’un changement de logging
- intégration facilitée avec outils de monitoring (ELK, Splunk, etc.)

👉 L’idée clé : **les applications n’écrivent pas “où aller les logs”, elles émettent seulement des événements de logs**

---

## 3. Architecture cible
APPLICATIONS

Batchs → java.util.logging (JUL)
APIs / Vendor → Apache Commons Logging (JCL)
Legacy → Log4j v1 (compatibilité optionnelle)

    ↓ (bridges)
BRIDGES LOGGING

JUL → Log4j2 (log4j-jul)
JCL → Log4j2 (log4j-jcl)
Log4j v1 → Log4j2 (log4j-1.2-api)

    ↓
MOTEUR CENTRALISÉ

Apache Log4j2 (WebSphere lib/ext)

    ↓
SORTIE LOGS

Fichiers / console / systèmes externes


---

## 4. Implémentation

### 4.1 Suppression Log4j du code applicatif

Toutes les références directes à Log4j v1 doivent être supprimées.

Avant :
```java
Logger.getLogger(...)

Après :

JUL pour les batchs
JCL pour les applications vendor

👉 Le code ne dépend plus d’un framework de logging.

4.2 Installation Log4j2 dans WebSphere (lib/ext)

Log4j2 est installé uniquement au niveau serveur.

JARs requis :

log4j-api-2.x.jar
log4j-core-2.x.jar
log4j-jul-2.x.jar
log4j-jcl-2.x.jar

Optionnel (sécurisation migration) :

log4j-1.2-api-2.x.jar
4.3 Configuration centralisée

Toute la gestion des logs est pilotée par :

log4j2.xml

Ce fichier permet de définir :

les formats de logs
les appenders (fichiers, console…)
les niveaux de logs
les règles par package ou module

👉 Aucun fichier de configuration logging côté application.

4.4 Routage JUL vers Log4j2 (point critique)

Dans WebSphere, ajouter dans les JVM arguments :

-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager
Pourquoi c’est indispensable ?

Sans ce paramètre :

JUL reste isolé dans le logging natif de la JVM
les logs batch ne sont pas centralisés

Avec ce paramètre :

JUL est intercepté
transformé en événements Log4j2
intégré au système centralisé
5. Rôle de lib/ext
À supprimer
log4j-1.x.jar
commons-logging.properties
À ajouter
log4j-api
log4j-core
log4j-jul
log4j-jcl
log4j-1.2-api (temporaire)
6. Principe clé : la centralisation

Le principe fondamental est :

Les applications ne doivent pas décider où vont les logs.

Elles doivent uniquement :

produire des événements de logs

Le serveur doit :

décider comment les traiter
comment les formater
où les écrire
7. Résultat final

Après mise en place :

plus aucun Log4j dans les applications
JUL + JCL standardisés
logs centralisés dans Log4j2
configuration unique
architecture découplée et évolutive
8. Résumé

Cette architecture transforme le logging de :

“chaque application gère ses logs”

vers :

“la plateforme centralise et contrôle tous les logs”

👉 C’est cette centralisation qui permet :

cohérence
maintenabilité
évolutivité
observabilité unifiée
```