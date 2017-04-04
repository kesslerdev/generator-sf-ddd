<?php

namespace <%= <$= generatorName $>.contextNamespace %>\<$ if (buildOpts.canChangeDir) { $><%= baseNamespace %><$ } else{ $><$= generatorNamespace $><$ } $>;

/**
 * Class <%= <$= generatorName $>.<$= generatorName $>Name %><$ if (buildOpts.hasSuffix) { $><%= <$= generatorName $>.<$= generatorName $>Suffix %><$ } $><$= generatorSuffix $>
 *
 * @package <%= <$= generatorName $>.contextNamespace %>\<$ if (buildOpts.canChangeDir) { $><%= baseNamespace %><$ } else{ $><$= generatorNamespace $><$ } $>
 * @author  <%= root.authorName %> <<%= root.authorEmail %>>
 */
class <%= <$= generatorName $>.<$= generatorName $>Name %><$ if (buildOpts.hasSuffix) { $><%= <$= generatorName $>.<$= generatorName $>Suffix %><$ } $><$= generatorSuffix $>
{
// @see <https://github.com/mde/ejs/blob/master/docs/syntax.md>
<% if (xxx.yyy) { %>
    //options usage
<% } %>
}
