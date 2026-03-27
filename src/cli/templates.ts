/**
 * Templates for the scaffolded React library project.
 */

export const getPackageJson = (projectName: string) => `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "A React library with dual-build strategy.",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist/",
    "!dist/build/"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:umd": "vite build --config vite.umd.config.ts",
    "build:all": "npm run build && npm run build:umd",
    "preview": "vite preview"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.2",
    "vite": "^6.0.0",
    "vite-plugin-css-injected-by-js": "^3.5.0",
    "vite-plugin-dts": "^4.3.0"
  }
}`;

export const getViteConfig = () => `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ insertTypesEntry: true }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'MyLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => \`index.\${format === 'es' ? 'js' : 'cjs'}\`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
`;

export const getViteUmdConfig = () => `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJsPlugin(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist/build',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'MyLibrary',
      formats: ['umd'],
      fileName: () => 'index.umd.js',
    },
    rollupOptions: {
      // In UMD build, we bundle everything for zero-dependency browser use
      external: [],
    },
  },
});
`;

export const getIndexTsx = () => `import React from 'react';
import { createRoot } from 'react-dom/client';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import './index.css';

export interface MyComponentProps {
  title?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title = "Hello from Dual-Build Library!" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
          <Sparkles size={32} />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500">
        This component is styled with Tailwind CSS v4 and supports both ESM/CJS and a standalone UMD bundle.
      </p>
      <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        Action Button
      </button>
    </motion.div>
  );
};

/**
 * Standalone initializer for browser/UMD usage.
 */
export const init = (selector: string, props: MyComponentProps = {}) => {
  const container = document.querySelector(selector);
  if (!container) {
    console.error(\`Container \${selector} not found\`);
    return;
  }
  const root = createRoot(container);
  root.render(<MyComponent {...props} />);
};

export default MyComponent;
`;

export const getIndexCss = () => `@import "tailwindcss";

/* Custom styles can go here */
`;

export const getTsConfig = () => `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
`;

export const getGitIgnore = () => `node_modules
dist
.DS_Store
*.local
`;
