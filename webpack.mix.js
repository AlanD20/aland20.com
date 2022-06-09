const mix = require('laravel-mix');

mix.setPublicPath('styles');
mix.options({
  processCssUrls: false
});
//Do not put a forward slash at the start.
mix.postCss('src/css/globals.css', 'styles/', [
  require('tailwindcss'),
  require('autoprefixer'),
  require('cssnano')({
    preset: 'default',
  }),
]);
mix.disableSuccessNotifications();
