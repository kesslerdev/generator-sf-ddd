<?php

namespace <%= controller.contextNamespace %>\<%= baseNamespace %>;

<% if (controller.crudTypes.includes(`CREATE`) || controller.crudTypes.includes(`UPDATE`)) { %>use FOS\RestBundle\View\View;
<% } %>use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Xeonys\RestExtra\UI\Controller\AbstractRestController;
<% if (controller.crudTypes.includes(`READ_SINGLE`) || controller.crudTypes.includes(`UPDATE`) || controller.crudTypes.includes(`DELETE`)) { %>use <%= controller.contextNamespace %>\Domain\Exception\<%= str.classN() %>NotFoundException;
<% } %><% if (controller.crudTypes.includes(`READ_LIST`)) { %>use <%= controller.contextNamespace %>\App\Query;
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
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
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
     * @param integer $id
     *
     * @throws <%= str.classN() %>NotFoundException
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>/{id}.{_format}", name="<%= str.pluralUrlN() %>_show", requirements={"_version": "v1", "id": "\d+", "_format": "json"})
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
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response|View
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>.{_format}", name="<%= str.pluralUrlN() %>_create", requirements={"_version": "v1", "_format": "json"})
     * @Method("POST")
     */
    public function create<%= str.classN() %>Action(Request $request)
    {
        $form = $this->createForm(<%= str.classN() %>CreateType::class);
        $form->handleRequest($request);

        if (false === $form->isValid()) {
            return View::create($form, 400);
        }

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        <%= str.varN() %> = $bus->handle($form->getData());

        return $this->createJSONSerializedResponse(<%= str.varN() %>, [], 201);
    }<% } %><% if (controller.crudTypes.includes(`UPDATE`)) { %>
    /**
     * @param integer                                   $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws <%= str.classN() %>NotFoundException
     * @return \Symfony\Component\HttpFoundation\Response|View
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>/{id}.{_format}", name="<%= str.pluralUrlN() %>_patch_update", requirements={"_version": "v1", "id": "\d+", "_format": "json"})
     * @Method("PATCH")
     */
    public function patch<%= str.classN() %>Action($id, Request $request)
    {
        <%= str.varN() %> = $this->get('<%= str.repoN() %>')->findRequired($id);
        // adds Security ;)

        $form = $this->createForm(<%= str.classN() %>UpdateType::class, <%= str.classN() %>UpdateCommand::createFrom<%= str.classN() %>(<%= str.varN() %>));
        $form->handleRequest($request);

        if (false === $form->isValid()) {
            return View::create($form, 400);
        }

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        <%= str.varN() %> = $bus->handle($form->getData());

        return $this->createJSONSerializedResponse(<%= str.varN() %>);
    }<% } %><% if (controller.crudTypes.includes(`DELETE`)) { %>
    /**
     * @param integer $id
     *
     * @throws <%= str.classN() %>NotFoundException
     * @return View
     *
     * @Route("/{_version}/<%= str.pluralUrlN() %>/{id}.{_format}", name="<%= str.pluralUrlN() %>_delete", requirements={"_version": "v1", "id": "\d+", "_format": "json"})
     * @Method("DELETE")
     */
    public function remove<%= str.classN() %>Action($id)
    {
        <%= str.varN() %> = $this->get('<%= str.repoN() %>')->findRequired($id);
        // adds Security ;)

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        $bus->handle(new <%= str.classN() %>DeleteCommand($id));

        return View::create();
    }<% } %><% } %>
}
