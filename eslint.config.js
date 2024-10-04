import antfu from '@antfu/eslint-config'
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
  [
    ...tailwind.configs['flat/recommended'],
  ],
)
