<?php

namespace <%= bundle.contextNamespace %>\App\Bundle;

<% if (bundle.hasCompiler) { %>use Symfony\Component\DependencyInjection\ContainerBuilder;
<% } %>use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * Class <%= bundle.bundleName %>Bundle
 *
 * @package <%= bundle.contextNamespace %>\App\Bundle
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= bundle.bundleName %>Bundle extends Bundle
{<% if (bundle.hasCompiler) { %>
    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new DependencyInjection\Compiler\<%= bundle.compilerPassName %>Pass());
    }<% } %>
}
