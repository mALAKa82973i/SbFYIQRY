// @ts-check
const emotionPlugin = require('@emotion/eslint-plugin');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const lodashPlugin = require('eslint-plugin-lodash');
const barrelPlugin = require('eslint-plugin-no-barrel-files');

const grafanaConfig = require('@grafana/eslint-config/flat');
const grafanaPlugin = require('@grafana/eslint-plugin');

// as we just want to pull in all of the necessary configuration but not run the rules
// (this should only be concerned with checking rules that we want to improve,
// so there's no need to try and run the rules that will be linted properly anyway)
const { rules, ...baseConfig } = grafanaConfig;

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
module.exports = [
  {
    name: 'grafana/betterer-ignores',
    ignores: [
      '.github',
      '.yarn',
      '**/.*',
      '**/*.gen.ts',
      '**/build/',
      '**/compiled/',
      'deployment_tools_config.json',
      'devenv',
      'e2e/test-plugins',
      'e2e/tmp',
      'packages/grafana-ui/src/components/Icon/iconBundle.ts',
      'pkg',
      'playwright-report',
      'public/lib/monaco/',
      'public/locales/_build',
      'public/vendor/',
      'scripts/grafana-server/tmp',
      '!.betterer.eslint.config.js',
    ],
  },
    name: 'react/jsx-runtime',
    ...reactPlugin.configs.flat['jsx-runtime'],
  },
  {
    plugins: {
      ...baseConfig.plugins,
      '@emotion': emotionPlugin,
      lodash: lodashPlugin,
      jest: jestPlugin,
      'no-barrel-files': barrelPlugin,
      '@grafana': grafanaPlugin,
      'testing-library': testingLibraryPlugin,
    },
    linterOptions: {
      // This reports unused disable directives that we can clean up but
      // it also conflicts with the betterer eslint rules so disabled
      reportUnusedDisableDirectives: false,
    },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@grafana/no-aria-label-selectors': 'error',
        'error',
        {
          patterns: [
            {
              group: ['@grafana/ui*', '*/Layout/*'],
              importNames: ['Layout', 'HorizontalGroup', 'VerticalGroup'],
              message: 'Use Stack component instead.',
            },
            {
              message: 'Import from the public export instead.',
            },
          ],
        },
      ],
    },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/*.{test,spec}.{ts,tsx}',
      '**/__mocks__/**',
      '**/public/test/**',
      '**/mocks.{ts,tsx}',
      '**/spec/**/*.{ts,tsx}',
    ],
    rules: {
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    files: ['**/*.{js,jsx,ts,tsx}'],
      '**/public/test/**',
      '**/mocks.{ts,tsx}',
      '**/spec/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Identifier[name=localStorage]',
          message: 'Direct usage of localStorage is not allowed. Use `Store` from @grafana/data instead.',
          message: 'Direct usage of localStorage is not allowed. Use `Store` from @grafana/data instead.',
        },
            'Program:has(ImportDeclaration[source.value="@grafana/ui"] ImportSpecifier[imported.name="Card"]) JSXOpeningElement[name.name="Card"]:not(:has(JSXAttribute[name.name="noMargin"]))',
          message:
            'Add noMargin prop to Card components to remove built-in margins. Use layout components like Stack or Grid with the gap prop instead for consistent spacing.',
        },
        {
          selector:
            'Program:has(ImportDeclaration[source.value="@grafana/ui"] ImportSpecifier[imported.name="Field"]) JSXOpeningElement[name.name="Field"]:not(:has(JSXAttribute[name.name="noMargin"]))',
          message:
            'Add noMargin prop to Field components to remove built-in margins. Use layout components like Stack or Grid with the gap prop instead for consistent spacing.',
  },
  {
    files: ['public/app/**/*.{ts,tsx}'],
    rules: {
      'no-barrel-files/no-barrel-files': 'error',
    },
  },
];
