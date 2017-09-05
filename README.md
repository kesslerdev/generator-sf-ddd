# Yeoman Generator sf-ddd

Yeoman Generators for ddd sf app with CQRS/EventSourcing

`sf-ddd:generator` generator is named `g²`

## TODO

- [ ] add validation on prompt (required not empty)
- [ ] pass bundle generator to new format (with Prompting class)
- [ ] add router option to normalizer generator
- [ ] implement controller

### New Options for g²

- [ ] to test - new option to generate the code for generating service.xml file


### new improvements

> Ne pas perdre 3h pour des problèmes d'alignement compliqués à corrigées, il serait mieux d'utiliser ce temps pour implement d'autres trucs :)

- [ ] add a generator to add all needed files in kernel with correct namespace.
  - comme `App\Query\QueryableQueryInterface` `Domain\Exception\InvalidQueryParameterException`
  - [ ] ajouter une fonction utilitaire pour valider que le bon fichier dans le BdCtx est présent => sinon petit message d'info ;)
- [ ] implementer la generation des commandes CQRS

#### Query Generator

- [x] utiliser le bon namespace dans le generateur de Query

#### Controller Generator

- [x] implementer basiquement les actions CRUD dans le générateur de controller

#### Service Generator

- [ ] checker dans le services.xml si le service est déja defini si c'est le cas => abort / override

#### Entity Generator

- [ ] implementer la generation des entities
- [ ] avec generation du mapping xml (fichier uniquement)
- [ ] avec generation du repository & de son interface d'abstraction (on/off)

#### Commands CQRS generator

- [ ] implementer la generation des commandes CQRS
- [ ] support de commands "vides" (simple classe dans le bon dossier)
- [x] support des commandes de "delete" comme la vide mais avec un constructeur pour l'id (avec un accessor)
- [x] support des commandes de "update" voir la command !

#### Form type generator (CQRS => lié à la commande)

- [ ] implementer la generation des formtypes
- [ ] support de form "vides" (simple classe dans le bon dossier)
- [x] support des form de "update" en patch etc
- [x] support des form de "create" post etc
