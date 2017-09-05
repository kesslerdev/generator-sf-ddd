<?php

namespace <%= command.contextNamespace %>\<%= baseNamespace %>;

use Rezzza\CommandBus\Domain\CommandInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareTrait;
use <%= command.contextNamespace %>\Domain\<%= str.classN() %>;

/**
 * Class <%= str.classN() %>UpdateCommand
 *
 * @package <%= command.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= str.classN() %>UpdateCommand implements EventSourcingIdAwareInterface, CommandInterface
{
    use EventSourcingIdAwareTrait;

    private <%= str.varN() %>Id;
    private $name;

    /**
     * <%= str.classN() %>UpdateCommand constructor.
     *
     * @param string <%= str.varN() %>Id
     * @param string $name
     */
    protected function __construct(<%= str.varN() %>Id, $name)
    {
        $this-><%= str.varN(true) %>Id = <%= str.varN() %>Id;
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function get<%= str.classN() %>Id()
    {
        return $this-><%= str.varN(true) %>Id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @param <%= str.classN() %> <%= str.varN() %>
     *
     * @return static
     */
    public static function createFrom<%= str.classN() %>(<%= str.classN() %> <%= str.varN() %>)
    {
        return new static(
            <%= str.varN() %>->getId(),
            <%= str.varN() %>->getName()
        );
    }
}
