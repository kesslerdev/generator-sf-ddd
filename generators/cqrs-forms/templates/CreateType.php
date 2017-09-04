<?php

namespace <%= form.contextNamespace %>\<%= baseNamespace %>;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use <%= form.contextNamespace %>\App\Command\<%= str.classN() %>CreateCommand;

/**
 * {@inheritdoc}
 */
class <%= str.classN() %>CreateType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => <%= str.classN() %>CreateCommand::class,
            'method' => 'POST',
            'empty_data' => function (FormInterface $form) {
                return new <%= str.classN() %>CreateCommand(
                    $form->get('name')->getData()
                );
            },
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
