#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import * as templates from './templates.js';

const program = new Command();

program
  .name('create-npm-boiler')
  .description('Scaffold a modern React library with dual-build strategy')
  .version('1.0.0')
  .argument('<project-name>', 'Name of the project to create')
  .action(async (projectName: string) => {
    const targetDir = path.resolve(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      console.error(chalk.red(`Error: Directory ${projectName} already exists.`));
      process.exit(1);
    }

    console.log(chalk.blue(`Scaffolding project in ${targetDir}...`));

    try {
      // Create directories
      await fs.ensureDir(targetDir);
      await fs.ensureDir(path.join(targetDir, 'src'));
      await fs.ensureDir(path.join(targetDir, 'src/components'));
      await fs.ensureDir(path.join(targetDir, 'src/lib'));

      // Write files
      await fs.writeFile(path.join(targetDir, 'package.json'), templates.getPackageJson(projectName));
      await fs.writeFile(path.join(targetDir, 'vite.config.ts'), templates.getViteConfig());
      await fs.writeFile(path.join(targetDir, 'vite.umd.config.ts'), templates.getViteUmdConfig());
      await fs.writeFile(path.join(targetDir, 'tsconfig.json'), templates.getTsConfig());
      await fs.writeFile(path.join(targetDir, 'src/index.tsx'), templates.getIndexTsx());
      await fs.writeFile(path.join(targetDir, 'src/index.css'), templates.getIndexCss());
      await fs.writeFile(path.join(targetDir, '.gitignore'), templates.getGitIgnore());

      console.log(chalk.green(`\nSuccess! Created ${projectName} at ${targetDir}`));
      console.log(chalk.cyan('\nNext steps:'));
      console.log(chalk.white(`  cd ${projectName}`));
      console.log(chalk.white('  npm install'));
      console.log(chalk.white('  npm run dev          # Start development server'));
      console.log(chalk.white('  npm run build        # Build ESM/CJS for npm'));
      console.log(chalk.white('  npm run build:umd    # Build standalone UMD bundle'));
      console.log(chalk.white('\nHappy coding!'));

    } catch (error) {
      console.error(chalk.red('An error occurred during scaffolding:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
