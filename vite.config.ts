import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserOrOrganizationPage = repositoryName?.endsWith('.github.io') ?? false
const base =
  process.env.GITHUB_ACTIONS && repositoryName && !isUserOrOrganizationPage
    ? `/${repositoryName}/`
    : '/'

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
