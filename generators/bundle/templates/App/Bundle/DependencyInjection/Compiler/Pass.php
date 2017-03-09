<?php

namespace <%= bundle.contextNamespace %>\App\Bundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Class <%= bundle.compilerPassName %>Pass
 *
 * @package <%= bundle.contextNamespace %>\App\Bundle\DependencyInjection\Compiler
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= bundle.compilerPassName %>Pass implements CompilerPassInterface
{
    /**
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        //extended service
        $service = $container->findDefinition('...');
        
        //find services with tag
        $taggedServices = $container->findTaggedServiceIds('...');

        //support priority
        uksort($taggedServices, function($left, $right) {
            $left = isset($left[0]['priority']) ? (int) $left[0]['priority'] : 0;
            $right = isset($right[0]['priority']) ? (int) $right[0]['priority'] : 0;

            if ($left === $right) {
                return 0;
            }

            return $left > $right ? -1 : 1;
        });

        $refServices = [];

        foreach ($taggedServices as $id => $tags) {
            $refServices[] = new Reference($id);
        }
        
        //set tagged services as first argument
        $service->replaceArgument(0, $refServices);
    }
}
