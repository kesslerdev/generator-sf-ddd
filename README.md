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

- [ ] utiliser le bon namespace dans le generateur de Query

#### Controller Generator

- [ ] implementer basiquement les actions CRUD dans le générateur de controller

#### Entity Generator

- [ ] implementer la generation des entities
- [ ] avec generation du mapping xml (fichier uniquement)
- [ ] avec generation du repository & de son interface d'abstraction (on/off)

#### Commands CQRS generator

- [ ] implementer la generation des commandes CQRS
- [ ] support de commands "vides" (simple classe dans le bon dossier)
- [ ] support des commandes de "delete" comme la vide mais avec un constructeur pour l'id (avec un accessor)
- [ ] support des commandes de "update" voir la command !

```php
<?php

namespace IED\Marketplace\Module\App\Command;

use Rezzza\CommandBus\Domain\CommandInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareTrait;
use IED\Marketplace\Module\Domain\Module;

/**
 * Class ModuleUpdateCommand
 *
 * @package IED\Marketplace\Module\App\Command
 * @author  Jean-François MONNIER <jf.monnier@xeonys.com>
 */
class ModuleUpdateCommand implements EventSourcingIdAwareInterface, CommandInterface
{
    use EventSourcingIdAwareTrait;

    private $moduleId;


    protected function __construct(
        $moduleId
    ) {
        $this->moduleId = $moduleId;
    }

    /**
     * @return mixed
     */
    public function getModuleId()
    {
        return $this->moduleId;
    }

    /**
     * @param Module $module
     *
     * @return static
     */
    public static function createFromModule(Module $module)
    {
        return new static(
            $module->getId()
        );
    }
}

```
#### Form type generator (CQRS => lié à la commande)

- [ ] implementer la generation des formtypes
- [ ] support de form "vides" (simple classe dans le bon dossier)
- [ ] support des form de "update" en patch etc
- [ ] support des form de "create" post etc
