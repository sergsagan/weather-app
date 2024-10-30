import js from '@eslint/js';
import eslintConfigPrettier from '@vue/eslint-config-prettier';
import tailwind from 'eslint-plugin-tailwindcss';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { plugins: { eslintConfigPrettier } },
  ...tailwind.configs['flat/recommended'],

  {
    rules: {
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: [
            'fa-solid',
            'fa-plus',
            'fa-sun',
            'fa-circle-info',
            'fa-moon',
            'fa-cloud'
          ],
        },
      ],
    },
  },
];
