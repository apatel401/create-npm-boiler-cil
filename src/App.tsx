import { useState } from 'react';
import { 
  Terminal, 
  Package, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Github,
  ChevronRight,
  Monitor,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STEPS = [
  {
    title: "Initialize",
    command: "npx create-npm-boiler my-library",
    description: "Scaffolds a new React library project with dual-build configuration."
  },
  {
    title: "Install",
    command: "cd my-library && npm install",
    description: "Installs dependencies including React 19, Vite 6, and Tailwind 4."
  },
  {
    title: "Build ESM/CJS",
    command: "npm run build",
    description: "Generates a lean build for npm consumers, externalizing React."
  },
  {
    title: "Build UMD",
    command: "npm run build:umd",
    description: "Generates a standalone, zero-dependency bundle for direct browser use."
  }
];

const CODE_SNIPPETS = {
  'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ insertTypesEntry: true }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'MyLibrary',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});`,
  'vite.umd.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    outDir: 'dist/build',
    lib: {
      entry: 'src/index.tsx',
      name: 'MyLibrary',
      formats: ['umd'],
      fileName: () => 'index.umd.js',
    },
    rollupOptions: {
      external: [], // Bundle everything for standalone use
    },
  },
});`
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'test'>('overview');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      {/* Header */}
      <header className="border-b border-[#141414] p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#141414] p-2 rounded">
            <Package className="text-[#E4E3E0]" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">create-npm-boiler</h1>
            <p className="text-[11px] font-mono opacity-50 uppercase tracking-widest">v1.0.0 // dual-build-scaffolder</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`text-xs font-mono uppercase tracking-widest px-4 py-2 border border-[#141414] transition-all ${activeTab === 'overview' ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#141414]/5'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`text-xs font-mono uppercase tracking-widest px-4 py-2 border border-[#141414] transition-all ${activeTab === 'code' ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#141414]/5'}`}
          >
            Architecture
          </button>
          <button 
            onClick={() => setActiveTab('test')}
            className={`text-xs font-mono uppercase tracking-widest px-4 py-2 border border-[#141414] transition-all ${activeTab === 'test' ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#141414]/5'}`}
          >
            Testing
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Hero Section */}
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white border border-[#141414] p-8">
                  <h2 className="font-serif italic text-3xl mb-4">The modern way to ship React libraries.</h2>
                  <p className="text-lg leading-relaxed opacity-80 mb-8">
                    Stop fighting with build configurations. <code className="bg-[#141414]/5 px-1 rounded">create-npm-boiler</code> scaffolds a production-ready environment that handles both npm distribution and direct browser integration out of the box.
                  </p>
                  
                  <div className="bg-[#141414] text-[#E4E3E0] p-6 rounded-lg font-mono relative group">
                    <div className="flex items-center gap-2 mb-2 opacity-50 text-[10px] uppercase tracking-widest">
                      <Terminal size={12} />
                      Terminal Input
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">npx create-npm-boiler my-awesome-lib</span>
                      <button 
                        onClick={() => copyToClipboard('npx create-npm-boiler my-awesome-lib', 'hero')}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded"
                      >
                        {copied === 'hero' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[#141414] p-6 bg-white/50">
                    <Layers className="mb-4" size={24} />
                    <h3 className="font-bold uppercase text-xs tracking-widest mb-2">Dual-Build Strategy</h3>
                    <p className="text-sm opacity-70">ESM/CJS for modern bundlers and a standalone UMD bundle for zero-dependency browser usage.</p>
                  </div>
                  <div className="border border-[#141414] p-6 bg-white/50">
                    <Code2 className="mb-4" size={24} />
                    <h3 className="font-bold uppercase text-xs tracking-widest mb-2">Zero-Config CSS</h3>
                    <p className="text-sm opacity-70">Styles are automatically injected into the DOM using Vite plugins, removing the need for separate CSS imports.</p>
                  </div>
                </div>
              </div>

              {/* Sidebar / Steps */}
              <div className="space-y-4">
                <h3 className="font-serif italic text-sm opacity-50 uppercase tracking-widest px-2">Workflow</h3>
                {STEPS.map((step, i) => (
                  <div key={i} className="border border-[#141414] p-4 bg-white hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors group cursor-default">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[10px] opacity-50">0{i + 1}</span>
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-bold text-sm uppercase mb-1">{step.title}</h4>
                    <p className="text-xs opacity-60 mb-3">{step.description}</p>
                    <code className="text-[10px] font-mono bg-[#141414]/5 group-hover:bg-white/10 p-1 block rounded">
                      {step.command}
                    </code>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div 
              key="code"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(CODE_SNIPPETS).map(([filename, code]) => (
                  <div key={filename} className="border border-[#141414] bg-[#141414] rounded-lg overflow-hidden">
                    <div className="bg-[#2A2A2A] px-4 py-2 flex justify-between items-center border-b border-[#141414]">
                      <span className="text-[10px] font-mono text-[#E4E3E0] uppercase tracking-widest">{filename}</span>
                      <button 
                        onClick={() => copyToClipboard(code, filename)}
                        className="text-[#E4E3E0] opacity-50 hover:opacity-100 transition-opacity"
                      >
                        {copied === filename ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <pre className="p-4 text-[11px] font-mono text-[#E4E3E0] overflow-x-auto leading-relaxed">
                      {code}
                    </pre>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-[#141414] p-8">
                <h3 className="font-serif italic text-2xl mb-4">Why Dual-Build?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Cpu size={18} />
                      <span className="font-bold uppercase text-xs tracking-widest">NPM Consumers</span>
                    </div>
                    <p className="text-sm opacity-80">
                      Developers using Webpack, Vite, or Next.js want lean packages. We externalize React so they don't end up with duplicate versions in their bundle.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-orange-600">
                      <Monitor size={18} />
                      <span className="font-bold uppercase text-xs tracking-widest">Direct Browser</span>
                    </div>
                    <p className="text-sm opacity-80">
                      Sometimes you just want to drop a script tag into a legacy site. Our UMD build bundles everything (including React) into a single file that "just works".
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'test' && (
            <motion.div 
              key="test"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white border border-[#141414] p-8 space-y-8">
                <h2 className="font-serif italic text-3xl">Local Testing Guide</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold uppercase text-xs tracking-widest">1. Link the CLI</h3>
                    <p className="text-sm opacity-70">Run this in the root of the <code className="bg-[#141414]/5 px-1">create-npm-boiler</code> project:</p>
                    <div className="bg-[#141414] text-[#E4E3E0] p-4 rounded font-mono text-xs">
                      npm link
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold uppercase text-xs tracking-widest">2. Run the Scaffolder</h3>
                    <p className="text-sm opacity-70">Now you can use the command directly in your terminal:</p>
                    <div className="bg-[#141414] text-[#E4E3E0] p-4 rounded font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span>create-npm-boiler my-test-lib</span>
                        <span className="text-[9px] opacity-40 uppercase tracking-tighter">Global Command</span>
                      </div>
                      <div className="opacity-50 text-[10px] border-t border-white/10 pt-2 mt-2"># OR use npx for the local package:</div>
                      <div className="flex items-center justify-between">
                        <span>npx . my-test-lib</span>
                        <span className="text-[9px] opacity-40 uppercase tracking-tighter">Local Execution</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold uppercase text-xs tracking-widest">3. Verify the Output</h3>
                    <p className="text-sm opacity-70">Check the generated folder structure and try running the build scripts:</p>
                    <div className="bg-[#141414] text-[#E4E3E0] p-4 rounded font-mono text-xs space-y-1">
                      <div>cd my-test-lib</div>
                      <div>npm install</div>
                      <div>npm run build:all</div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#141414]/10 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] font-mono opacity-50 uppercase tracking-widest">
                    <Github size={14} />
                    Open Source // MIT License
                  </div>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest hover:underline"
                  >
                    View Source <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-[#141414] bg-[#E4E3E0] p-4 flex justify-between items-center px-6">
        <div className="flex items-center gap-4 text-[10px] font-mono opacity-50 uppercase tracking-widest">
          <span>System Status: Online</span>
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
          &copy; 2026 Create NPM Boiler // Built for Dual-Build Libraries
        </div>
      </footer>
    </div>
  );
}
