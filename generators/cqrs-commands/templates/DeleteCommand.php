<?php

namespace <%= command.contextNamespace %>\<%= baseNamespace %>;

use Rezzza\CommandBus\Domain\CommandInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareInterface;
use Xeonys\EventSourcing\Domain\EventSourcingIdAwareTrait;

/**
 * Class <%= str.classN() %>DeleteCommand
 *
 * @package <%= command.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= str.classN() %>DeleteCommand implements EventSourcingIdAwareInterface, CommandInterface
{
    use EventSourcingIdAwareTrait;

    private <%= str.varN() %>Id;

    /**
     * <%= str.classN() %>DeleteCommand constructor.
     *
     * @param string <%= str.varN() %>Id
     */
    public function __construct(<%= str.varN() %>Id)
    {
        $this-><%= str.varN(true) %>Id = <%= str.varN() %>Id;
    }

    /**
     * @return string
     */
    public function get<%= str.classN() %>Id()
    {
        return $this-><%= str.varN(true) %>Id;
    }
}
