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
      handler: 'cacheFirst' 
    },
    {
      urlPattern: /^https:\/\/gstatic.com\//,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/fonts.googleapis.com\//,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/fonts.gstatic.com\//,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/ajax.googleapis.com\//,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/www.google-analytics.com\//,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/xn--st-viaa.fi\/image\//,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/opendata.fmi.fi\//,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'weather-data-cache',
        },
        ignoreUrlParametersMatching: '[/starttime/, /endtime/]'
      }
    }
  ]
};