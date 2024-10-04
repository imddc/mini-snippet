import antfu from '@antfu/eslint-config'

export default antfu({

}, {
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/src-tauri/**',
    '**/*.d.ts',
  ],
})
