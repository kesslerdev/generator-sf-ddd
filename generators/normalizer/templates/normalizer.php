<?php

namespace <%= normalizer.contextNamespace %>\UI\RestDTO\Normalizer;

<% if (buildOpts.normalizerAware) { %>use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
<% } %>use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
<% if (buildOpts.normalizerAware) { %>use Xeonys\CRM\Kernel\UI\RestDTO\Normalizer\ExpandObjectTrait;
<% } %>use Xeonys\RestExtra\UI\RestDTO\Normalizer\ExpandTrait;
use <%= normalizer.contextNamespace %>\Domain\<%= normalizer.normalizerName %>;

/**
 * Class <%= normalizer.normalizerName %>Normalizer
 *
 * @package <%= normalizer.contextNamespace %>\UI\RestDTO\Normalizer
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= normalizer.normalizerName %>Normalizer implements NormalizerInterface<% if (buildOpts.normalizerAware) { %>, NormalizerAwareInterface<% } %>
{
    <% if (buildOpts.normalizerAware) { %>use NormalizerAwareTrait;
    use ExpandObjectTrait;
    <% } %>use ExpandTrait;

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof <%= normalizer.normalizerName %>;
    }

    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = [])
    {
        /** @var <%= normalizer.normalizerName %> $object */

        $payload = [
            'id'  => (int) $object->getId(),
            'xxx' => $object->getXxx(),<% if (buildOpts.normalizerAware) { %>
            'date' => $this->normalizeDate($object->getCreatedAt(), $format, $context),<% } %>
        ];
<% if (buildOpts.normalizerAware) { %>
        //normalize a sub object
        $this->normalizeObjectIfExpand($format, $context, 'xxx', $object->getXxx(), $payload);
        //normalize a sub collection of objects
        $this->normalizeObjectCollectionIfExpand($format, $context, 'xxx', $object->getXxx(), $payload);
<% } %>
        return $payload;
    }
}
