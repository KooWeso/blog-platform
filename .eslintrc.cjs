module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['vite.config.ts'],
        optionalDependencies: ['vite.config.ts'],
        peerDependencies: ['vite.config.ts'],
      },
    ],
    indent: ['error', 2],
    'prettier/prettier': 2,
    'linebreak-style': [0, 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'react/require-default-props': [
      'error',
      {
        functions: 'defaultArguments',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [2, { fixStyle: 'separate-type-imports' }],
    '@typescript-eslint/no-restricted-imports': [
      2,
      {
        paths: [
          {
            name: 'react-redux',
            importNames: ['useSelector', 'useStore', 'useDispatch'],
            message: 'Please use pre-typed versions from `src/app/hooks.ts` instead.',
          },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
