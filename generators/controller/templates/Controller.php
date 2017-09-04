<?php

namespace <%= controller.contextNamespace %>\<%= baseNamespace %>;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Xeonys\RestExtra\UI\Controller\AbstractRestController;
<% if (controller.crudTypes.includes(`DELETE`)) { %>use <%= controller.contextNamespace %>\App\Command\<%= str.classN() %>DeleteCommand;
<% } %><% if (controller.crudTypes.includes(`UPDATE`)) { %>use <%= controller.contextNamespace %>\App\Command\<%= str.classN() %>UpdateCommand;
<% } %><% if (controller.crudTypes.includes(`READ_LIST`)) { %>use <%= controller.contextNamespace %>\App\Query;
<% } %><% if (controller.crudTypes.includes(`CREATE`)) { %>use <%= controller.contextNamespace %>\Infra\Form\Type\<%= str.classN() %>CreateType;
<% } %><% if (controller.crudTypes.includes(`UPDATE`)) { %>use <%= controller.contextNamespace %>\Infra\Form\Type\<%= str.classN() %>UpdateType;
<% } %><% if (controller.crudTypes.includes(`READ_SINGLE`) || controller.crudTypes.includes(`UPDATE`) || controller.crudTypes.includes(`DELETE`)) { %>use <%= controller.contextNamespace %>\Domain\Exception\<%= str.classN() %>NotFoundException;
<% } %>
/**
 * Class <%= str.classN() %>Controller
 *
 * @package <%= controller.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= str.classN() %>Controller extends AbstractRestController
{<% if (controller.crudTypes.length) { %><% if (controller.crudTypes.includes(`READ_LIST`)) { %>
    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>.{_format}", name="<%= str.pluralUrlN() %>_list", requirements={"_version": "v1", "_format": "json"})
     * @Method("GET")
     */
    public function list<%= str.pluralClassN() %>Action(Request $request)
    {
        $query = Query\<%= str.classN() %>ListQuery::createFromRequest($request);
        $pager = $this->get('<%= str.repoN() %>')->paginateListQuery($query);

        return $this->createJSONSerializedResponse($pager);
    }<% } %><% if (controller.crudTypes.includes(`READ_SINGLE`)) { %>
    /**
     * @param string $id
     *
     * @throws <%= str.classN() %>NotFoundException
     * @return Response
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>/{id}.{_format}", name="<%= str.pluralUrlN() %>_show", requirements={"_version": "v1", "id": "\w{8}-\w{4}-\w{4}-\w{4}-\w{12}", "_format": "json"})
     * @Method("GET")
     */
    public function show<%= str.classN() %>Action($id)
    {
        <%= str.varN() %> = $this->get('<%= str.repoN() %>')->findRequired($id);
        // adds Security ;)

        return $this->createJSONSerializedResponse(
            <%= str.varN() %>
        );
    }<% } %><% if (controller.crudTypes.includes(`CREATE`)) { %>
    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>.{_format}", name="<%= str.pluralUrlN() %>_create", requirements={"_version": "v1", "_format": "json"})
     * @Method("POST")
     */
    public function create<%= str.classN() %>Action(Request $request)
    {
        $form = $this->createForm(<%= str.classN() %>CreateType::class);
        $form->handleRequest($request);

        if (false === $form->isValid()) {
            return $this->createJSONSerializedResponse($form, [], 400);
        }

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        <%= str.varN() %> = $bus->handle($form->getData());

        return $this->createJSONSerializedResponse(<%= str.varN() %>, [], 201);
    }<% } %><% if (controller.crudTypes.includes(`UPDATE`)) { %>
    /**
     * @param string $id
     * @param Request $request
     *
     * @throws <%= str.classN() %>NotFoundException
     * @return Response
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>/{id}.{_format}", name="<%= str.pluralUrlN() %>_patch_update", requirements={"_version": "v1", "id": "\w{8}-\w{4}-\w{4}-\w{4}-\w{12}", "_format": "json"})
     * @Method("PATCH")
     */
    public function patch<%= str.classN() %>Action($id, Request $request)
    {
        <%= str.varN() %> = $this->get('<%= str.repoN() %>')->findRequired($id);
        // adds Security ;)

        $form = $this->createForm(<%= str.classN() %>UpdateType::class, <%= str.classN() %>UpdateCommand::createFrom<%= str.classN() %>(<%= str.varN() %>));
        $form->handleRequest($request);

        if (false === $form->isValid()) {
            return $this->createJSONSerializedResponse($form, [], 400);
        }

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        <%= str.varN() %> = $bus->handle($form->getData());

        return $this->createJSONSerializedResponse(<%= str.varN() %>);
    }<% } %><% if (controller.crudTypes.includes(`DELETE`)) { %>
    /**
     * @param string $id
     *
     * @throws <%= str.classN() %>NotFoundException
     * @return Response
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>/{id}.{_format}", name="<%= str.pluralUrlN() %>_delete", requirements={"_version": "v1", "id": "\w{8}-\w{4}-\w{4}-\w{4}-\w{12}", "_format": "json"})
     * @Method("DELETE")
     */
    public function remove<%= str.classN() %>Action($id)
    {
        <%= str.varN() %> = $this->get('<%= str.repoN() %>')->findRequired($id);
        // adds Security ;)

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        $bus->handle(new <%= str.classN() %>DeleteCommand($id));

        return new Response('', 204);
    }<% } %><% } %>
}
