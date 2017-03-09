<?php

namespace <%= bundle.contextNamespace %>\App\Bundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;

/**
 * Class <%= bundle.bundleName %>Extension
 *
 * @package <%= bundle.contextNamespace %>\App\Bundle\DependencyInjection
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= bundle.bundleName %>Extension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $loader = new XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config/services'));
        $loader->load('...');
    }
}
