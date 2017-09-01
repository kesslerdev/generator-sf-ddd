<?php

namespace <%= controller.contextNamespace %>\<%= baseNamespace %>;

<% if (controller.crudTypes.includes(`CREATE`) || controller.crudTypes.includes(`UPDATE`)) { %>use FOS\RestBundle\View\View;
<% } %>use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Xeonys\RestExtra\UI\Controller\AbstractRestController;
<% if (controller.crudTypes.includes(`READ_SINGLE`) || controller.crudTypes.includes(`UPDATE`) || controller.crudTypes.includes(`DELETE`)) { %>use <%= controller.contextNamespace %>\Domain\Exception\<%= controller.controllerName %>NotFoundException;
<% } %>
/**
 * Class <%= controller.controllerName %>Controller
 *
 * @package <%= controller.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= controller.controllerName %>Controller extends AbstractRestController
{<% if (controller.crudTypes.length) { %><% if (controller.crudTypes.includes(`READ_LIST`)) { %>
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/{_version}/<%= str.underscored(pluralize(controller.controllerName)) %>.{_format}", name="<%= str.underscored(pluralize(controller.controllerName)) %>_list", requirements={"_version": "v1", "_format": "json"})
     * @Method("GET")
     */
    public function list<%= pluralize(controller.controllerName) %>Action(Request $request)
    {
        $query = Query\<%= controller.controllerName %>ListQuery::createFromRequest($request);
        $pager = $this->get('<%= repository %>')->paginateListQuery($query);

        return $this->createJSONSerializedResponse($pager);
    }<% } %><% if (controller.crudTypes.includes(`READ_SINGLE`)) { %>
    /**
     * @param integer $id
     *
     * @throws <%= controller.controllerName %>NotFoundException
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/{_version}/<%= str.underscored(pluralize(controller.controllerName)) %>/{id}.{_format}", name="<%= str.underscored(pluralize(controller.controllerName)) %>_show", requirements={"_version": "v1", "id": "\d+", "_format": "json"})
     * @Method("GET")
     */
    public function show<%= controller.controllerName %>Action($id)
    {
        $<%= str.camelize(controller.controllerName, true) %> = $this->get('<%= repository %>')->findRequired($id);
        // adds Security ;)
        
        return $this->createJSONSerializedResponse(
            $<%= str.camelize(controller.controllerName, true) %>
        );
    }<% } %><% if (controller.crudTypes.includes(`CREATE`)) { %>
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response|View
     *
     * @Route("/{_version}/<%= str.underscored(pluralize(controller.controllerName)) %>.{_format}", name="<%= str.underscored(pluralize(controller.controllerName)) %>_create", requirements={"_version": "v1", "_format": "json"})
     * @Method("POST")
     */
    public function create<%= controller.controllerName %>Action(Request $request)
    {
        $form = $this->createForm(<%= controller.controllerName %>CreateType::class);
        $form->handleRequest($request);

        if (false === $form->isValid()) {
            return View::create($form, 400);
        }

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        $<%= str.camelize(controller.controllerName, true) %> = $bus->handle($form->getData());

        return $this->createJSONSerializedResponse($<%= str.camelize(controller.controllerName, true) %>, [], 201);
    }<% } %><% if (controller.crudTypes.includes(`UPDATE`)) { %>
    /**
     * @param integer                                   $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws <%= controller.controllerName %>NotFoundException
     * @return \Symfony\Component\HttpFoundation\Response|View
     *
     * @Route("/{_version}/<%= str.underscored(pluralize(controller.controllerName)) %>/{id}.{_format}", name="<%= str.underscored(pluralize(controller.controllerName)) %>_patch_update", requirements={"_version": "v1", "id": "\d+", "_format": "json"})
     * @Method("PATCH")
     */
    public function patch<%= controller.controllerName %>Action($id, Request $request)
    {
        $<%= str.camelize(controller.controllerName, true) %> = $this->get('<%= repository %>')->findRequired($id);
        // adds Security ;)

        $form = $this->createForm(<%= controller.controllerName %>UpdateType::class, <%= controller.controllerName %>UpdateCommand::createFrom<%= controller.controllerName %>($<%= str.camelize(controller.controllerName, true) %>));
        $form->handleRequest($request);

        if (false === $form->isValid()) {
            return View::create($form, 400);
        }

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        $<%= str.camelize(controller.controllerName, true) %> = $bus->handle($form->getData());

        return $this->createJSONSerializedResponse($<%= str.camelize(controller.controllerName, true) %>);
    }<% } %><% if (controller.crudTypes.includes(`DELETE`)) { %>
    /**
     * @param integer $id
     *
     * @throws <%= controller.controllerName %>NotFoundException
     * @return View
     *
     * @Route("/{_version}/<%= str.underscored(pluralize(controller.controllerName)) %>/{id}.{_format}", name="<%= str.underscored(pluralize(controller.controllerName)) %>_delete", requirements={"_version": "v1", "id": "\d+", "_format": "json"})
     * @Method("DELETE")
     */
    public function remove<%= controller.controllerName %>Action($id)
    {
        $<%= str.camelize(controller.controllerName, true) %> = $this->get('<%= repository %>')->findRequired($id);
        // adds Security ;)

        $bus = $this->get('rezzza_command_bus.command_bus.synchronous');
        $bus->handle(new <%= controller.controllerName %>DeleteCommand($id));

        return View::create();
    }<% } %><% } %>
}
