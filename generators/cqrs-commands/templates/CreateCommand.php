<?php

namespace <%= command.contextNamespace %>\<%= baseNamespace %>;

use Rezzza\CommandBus\Domain\CommandInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareTrait;

/**
 * Class <%= str.classN() %>CreateCommand
 *
 * @package <%= command.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= str.classN() %>CreateCommand implements EventSourcingIdAwareInterface, CommandInterface
{
    use EventSourcingIdAwareTrait;

    private $name;

    /**
     * <%= str.classN() %>CreateCommand constructor.
     *
     * @param string $name
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
}