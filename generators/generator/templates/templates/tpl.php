<?php

namespace <%= <$= generatorName $>.contextNamespace %>\<$ if (buildOpts.canChangeDir) { $><%= baseNamespace %><$ } else{ $><$= generatorNamespace $><$ } $>;

/**
 * Class <%= <$= generatorName $>.<$= generatorName $>Name %><$= generatorSuffix $>
 *
 * @package <%= <$= generatorName $>.contextNamespace %>\<$ if (buildOpts.canChangeDir) { $><%= baseNamespace %><$ } else{ $><$= generatorNamespace $><$ } $>
 * @author  <%= root.authorName %> <%= root.authorEmail %>
 */
class <%= <$= generatorName $>.<$= generatorName $>Name %><$= generatorSuffix $>
// @see <https://github.com/mde/ejs/blob/master/docs/syntax.md>
{<% if (xxx.yyy) { %>
    //options usage
<% } %>
}
