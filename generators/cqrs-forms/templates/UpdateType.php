<?php

namespace <%= form.contextNamespace %>\<%= baseNamespace %>;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use <%= form.contextNamespace %>\App\Command\<%= str.classN() %>UpdateCommand;

/**
 * {@inheritdoc}
 */
class <%= str.classN() %>UpdateType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class'    => <%= str.classN() %>UpdateCommand::class,
            'method'        => 'PATCH',
            'error_mapping' => [
                //'moduleId' => 'module_id',
            ],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
        ;
    }
}
