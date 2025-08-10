// jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  // Автоматически очищать моки между тестами
  clearMocks: true,

  // Указывает, где Jest должен искать тестовые файлы
  testMatch: [
    "**/__tests__/**/*.ts"
  ],

  // Настройка для TypeScript
  // Использует ts-jest для компиляции TypeScript в JavaScript
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  // Указывает, что Jest должен игнорировать папки node_modules
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // Настройка среды для тестов
  testEnvironment: "node",

  // Указывает, какие файлы Jest должен считать модулями
  moduleFileExtensions: ["ts", "js", "json", "node"],
};

export default config;