const mix = require('laravel-mix');

mix.options({
  processCssUrls: false
});
mix.js('src/js/index.js', 'js')
  .postCss('src/css/index.css', 'css', [
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ]);
mix.disableSuccessNotifications();
