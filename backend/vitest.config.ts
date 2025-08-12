import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        pool: 'threads',
        poolOptions: {
            threads: {
                singleThread: true
            }
        },
        setupFiles: ['./src/tests/setupTests.ts'],
        environment: 'node',
    }
});
