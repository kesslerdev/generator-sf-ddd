<?php

namespace <%= repository.contextNamespace %>\<%= baseNamespace %>;

<% if (repository.crudTypes.includes(`READ_LIST`)) { %>use Pagerfanta\Pagerfanta;
use <%= repository.contextNamespace %>\App\Query\<%= str.classN() %>ListQuery;
<% } %><% if (repository.crudTypes.includes(`READ_SINGLE`)) { %>use <%= repository.contextNamespace %>\Domain\Exception\<%= str.classN() %>NotFoundException;
<% } %><% if (repository.crudTypes.includes(`READ_SINGLE`) || repository.crudTypes.includes(`UPDATE`) || repository.crudTypes.includes(`CREATE`) || repository.crudTypes.includes(`DELETE`)) { %>use <%= repository.contextNamespace %>\Domain\<%= str.classN() %>;
<% } %>
/**
 * Interface <%= str.classN() %>RepositoryInterface
 *
 * @package <%= repository.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
interface <%= str.classN() %>RepositoryInterface
{<% if (repository.crudTypes.includes(`READ_SINGLE`)) { %>
    /**
     * @param  string $id id
     * @throws <%= str.classN() %>NotFoundException
     *
     * @return <%= str.classN() %>
     */
    public function findRequired($id);<% } %><% if (repository.crudTypes.length) { %><% if (repository.crudTypes.includes(`READ_LIST`)) { %>
    /**
     * @param <%= str.classN() %>ListQuery $query query
     *
     * @return Pagerfanta
     */
    public function paginateListQuery(<%= str.classN() %>ListQuery $query);<% } %><% if (repository.crudTypes.includes(`CREATE`) || repository.crudTypes.includes(`UPDATE`)) { %>
    /**
     * @param <%= str.classN() %> <%= str.varN() %> <%= str.varN(true) %>
     *
     * @return <%= str.classN() %>
     */
    public function save(<%= str.classN() %> <%= str.varN() %>);<% } %><% if (repository.crudTypes.includes(`DELETE`)) { %>
    /**
     * @param <%= str.classN() %> <%= str.varN() %> <%= str.varN(true) %>
     *
     * @return void
     */
    public function remove(<%= str.classN() %> <%= str.varN() %>);<% } %><% } %>
}
