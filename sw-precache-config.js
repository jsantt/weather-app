/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint-env node */

module.exports = {
  staticFileGlobs: [
    'image/**/*',
    'manifest.json',
    'src/**/*'
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest' 
    },
    {
      urlPattern: /^https:\/\/www.gstatic.com\/firebasejs\/4.9.0\/firebase.js/,
      handler: 'fastest'
    },
    {
      urlPattern: /^https:\/\/data.fmi.fi/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'weather-data-cache',
        },
        ignoreUrlParametersMatching: '[/starttime/, /endtime/]'
      },
    },
    {
      urlPattern: /^https:\/\/fonts.googleapis.com\/css?family=Open+Sans+Condensed:300/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'fonts-cache',
        },
      },
    },
  ],
};