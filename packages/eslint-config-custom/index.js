module.exports = {
  overrides: [
    {
      files: ['backend/**/*.{js,ts,jsx,tsx}'],
      rules: {
        'next/core-web-vitals': 'warn',
      },
    },
    {
      files: ['frontend/**/*.{js,ts,jsx,tsx}'],
      rules: {
        'plugin:react/recommended': 'warn',
      },
    },
  ],
  plugins: ['unused-imports'],
  rules: {
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['css'],
      },
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'import/no-anonymous-default-export': ['off'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  },
  settings: {
    react: {
      version: '18',
    },
  },
  ignorePatterns: ['build/**/*', 'dist/**/*', '.next/**/*', 'node_modules/**/*'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'turbo',
  ],
}
