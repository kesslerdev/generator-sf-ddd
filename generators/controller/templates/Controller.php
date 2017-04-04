<?php

namespace <%= controller.contextNamespace %>\<%= baseNamespace %>;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Xeonys\RestExtra\UI\Controller\AbstractRestController;

/**
 * Class <%= controller.controllerName %>Controller
 *
 * @package <%= controller.contextNamespace %>\<%= baseNamespace %>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= controller.controllerName %>Controller extends AbstractRestController
{
}
