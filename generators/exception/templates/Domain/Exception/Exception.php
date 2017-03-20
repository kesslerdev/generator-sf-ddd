<?php

namespace <%= exception.contextNamespace %>\Domain\Exception;

use <%= baseException %>;

/**
 * Class <%= exception.exceptionName %>Exception
 *
 * @package <%= exception.contextNamespace %>\Domain\Exception
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= exception.exceptionName %>Exception extends <%= baseNameException %>
{<% if (buildOpts.sprintf) { %>
    /**
     * <%= exception.exceptionName %>Exception constructor.
     *
     * @param string $value
     */
    public function __construct($value)
    {
        parent::__construct(sprintf('message %s', $value));
    }<% } %>
}
