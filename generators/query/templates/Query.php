<?php

namespace <%= query.contextNamespace %>\App\Query;

use Symfony\Component\HttpFoundation\Request;<% if (query.generatorOptions.hasPagination) { %>
use Xeonys\CRM\Kernel\Domain\Exception\InvalidQueryParameterException;
<% } %>
/**
 * Class <%= query.queryName %><%= query.querySuffix %>Query
 *
 * @package <%= query.contextNamespace %>\App\Query
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= query.queryName %><%= query.querySuffix %>Query
{
    <% if (query.generatorOptions.hasQuery) { %>private $query;
    <% } %><% if (query.generatorOptions.hasPagination) { %>private $page;
    private $maxPerPage;
<% } %>
    /**
     <% if (query.generatorOptions.hasQuery) { %>* @param string $query <% if (query.generatorOptions.hasPagination) { %>     <% } %>query
     <% } %><% if (query.generatorOptions.hasPagination) { %>* @param int    $page       page
     * @param int    $maxPerPage maxPerPage
     <% } %>*/
    public function __construct(<% if (query.generatorOptions.hasQuery) { %>$query = null<% } %><% if (query.generatorOptions.hasPagination) { %><% if (query.generatorOptions.hasQuery) { %>, <% } %>$page = 1, $maxPerPage = 30<% } %>)
    {
<% if (query.generatorOptions.hasPagination) { %>        $this->page       = filter_var($page, FILTER_VALIDATE_INT);
        $this->maxPerPage = filter_var($maxPerPage, FILTER_VALIDATE_INT);
<% } %><% if (query.generatorOptions.hasQuery) { %>        $this->query <% if (query.generatorOptions.hasPagination) { %>     <% } %>= trim($query);<% } %><% if (query.generatorOptions.hasPagination) { %>
<% if (query.generatorOptions.hasQuery) { %>
<% } %>        if (false === $this->page) {
            throw new InvalidQueryParameterException('page parameter must be an integer.');
        }

        if (false === $this->maxPerPage) {
            throw new InvalidQueryParameterException('maxPerPage parameter must be an integer.');
        }<% } %>
    }
<% if (query.generatorOptions.hasPagination) { %>
    /**
     * @return integer
     */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * @return integer
     */
    public function getMaxPerPage()
    {
        return $this->maxPerPage;
    }
<% } %><% if (query.generatorOptions.hasQuery) { %>
    /**
     * @return bool
     */
    public function hasQuery()
    {
        return $this->query !== '';
    }

    /**
     * @return string
     */
    public function getQuery()
    {
        return $this->query;
    }
<% } %>
    /**
     * @param Request $request request
     *
     * @return self
     */
    public static function createFromRequest(Request $request)
    {
        return new static(
            <% if (query.generatorOptions.hasQuery) { %>$request->get('q')<% if (query.generatorOptions.hasPagination) { %>,<% } %><% } %><% if (query.generatorOptions.hasPagination) { %>
            $request->get('page', 1),
            $request->get('max_per_page', 30)<% } %>
        );
    }
}
