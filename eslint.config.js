import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/src-tauri/**',
      '**/*.d.ts',
    ],
  },
  {
    rules: {
      'vue/no-unused-refs': 'off',
    },
  },
  {
    ...oxlint.configs['flat/recommended'],
  },
  [
    ...tailwind.configs['flat/recommended'],
  ],

)
