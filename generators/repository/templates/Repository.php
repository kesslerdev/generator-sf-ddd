<?php

namespace <%= repository.contextNamespace %>\<%= baseNamespace %>;

use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
<% if (repository.crudTypes.includes(`READ_LIST`)) { %>use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use <%= repository.contextNamespace %>\App\Query\<%= str.classN() %>ListQuery;
<% } %><% if (repository.crudTypes.includes(`READ_SINGLE`)) { %>use <%= repository.contextNamespace %>\Domain\Exception\<%= str.classN() %>NotFoundException;
<% } %>use <%= repository.contextNamespace %>\Domain\Repository\<%= str.classN() %>RepositoryInterface;
use <%= repository.contextNamespace %>\Domain\<%= str.classN() %>;
<% if (repository.queryable) { %>use <%= repository.root.baseNamespace %>\Kernel\Infra\Repository\DoctrineORM\KeywordsQueryableRepositoryTrait;
<% } %>
/**
 * Class <%= str.classN() %>Repository
 *
 * @package <%= repository.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= str.classN() %>Repository implements <%= str.classN() %>RepositoryInterface
{
    <% if (repository.queryable) { %>use KeywordsQueryableRepositoryTrait;
    
<% } %>/** @var EntityManagerInterface */
    private $entityManager;

    /**
     * @param EntityManagerInterface $entityManager entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }<% if (repository.crudTypes.length) { %><% if (repository.crudTypes.includes(`READ_SINGLE`)) { %>
    /**
     * {@inheritdoc}
     */
    public function findRequired($id)
    {
        <%= str.varN() %> = $this->getRepository()->find($id);

        if (!<%= str.varN() %>) {
            throw new <%= str.classN() %>NotFoundException(sprintf('<%= str.classN() %> [%s] not found.', $id));
        }

        return <%= str.varN() %>;
    }<% } %><% if (repository.crudTypes.includes(`READ_LIST`)) { %>
    /**
     * {@inheritdoc}
     */
    public function paginateListQuery(<%= str.classN() %>ListQuery $query)
    {
        $queryBuilder = $this->getRepository()
            ->createQueryBuilder('p')
            ->orderBy('p.name', 'ASC')
            ;

        if ($query->hasQuery()) {
            $this->updateQueryBuilderForQuery($queryBuilder, $query, [
                'fields' => [
                    'p.name',
                ],
            ]);
        }

        $pager = new Pagerfanta(new DoctrineORMAdapter($queryBuilder));
        $pager->setMaxPerPage($query->getMaxPerPage());
        $pager->setCurrentPage($query->getPage());

        return $pager;
    }<% } %><% if (repository.crudTypes.includes(`UPDATE`) || repository.crudTypes.includes(`CREATE`)) { %>
    /**
     * {@inheritdoc}
     */
    public function save(<%= str.classN() %> <%= str.varN() %>)
    {
        $this->entityManager->persist(<%= str.varN() %>);
        $this->entityManager->flush();

        return <%= str.varN() %>;
    }<% } %><% if (repository.crudTypes.includes(`DELETE`)) { %>
    /**
     * {@inheritdoc}
     */
    public function remove(<%= str.classN() %> <%= str.varN() %>)
    {
        $this->entityManager->remove(<%= str.varN() %>);
        $this->entityManager->flush();
    }<% } %><% } %>
    /**
     * @return EntityRepository|ObjectRepository
     */
    private function getRepository()
    {
        return $this->entityManager->getRepository(<%= str.classN() %>::class);
    }
}
