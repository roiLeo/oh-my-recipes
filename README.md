# Oh My Recipes 👩‍🍳

> Culinary Adventures for the Curious Cook

A modern recipe management application built with Nuxt 3, designed to help you discover, organize, and share your favorite recipes.

## ✨ Features

- 📖 Browse and search cooking recipes
- 🎨 Modern, responsive UI built with Nuxt UI
- 📝 Content-driven architecture with markdown support
- 🚀 Fast and optimized with Nuxt 3
- 📱 Mobile-friendly design
- 🔍 Easy recipe discovery and filtering

## 🛠️ Tech Stack

- **Framework**: [Nuxt](https://nuxt.com/) - The Intuitive Vue Framework
- **UI Components**: [Nuxt UI](https://ui.nuxt.com/) - Fully styled and customizable components
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Consistent code formatting
- **Git Hooks**: [Husky](https://github.com/typicode/husky) - Automated quality checks

## 📋 Prerequisites

- Node.js (v20 or higher recommended)
- pnpm (or npm/yarn)

## 🚀 Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/roiLeo/oh-my-recipes.git
cd oh-my-recipes
pnpm install
```

### Development

Start the development server at `http://localhost:3000`:

```bash
pnpm dev
```

The application will automatically reload when you make changes to the code.

### Building for Production

Create an optimized production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## 📝 Adding Recipes

Recipes are stored as markdown files in the `content/recipes/` directory. Each recipe should follow a consistent format with frontmatter metadata.

Example recipe structure:

```markdown
---
title: "Your Recipe Name"
description: "Brief description of the recipe"
cookTime: "30 minutes"
servings: 4
---

## Ingredients
- Ingredient 1
- Ingredient 2

## Instructions
1. Step 1
2. Step 2
```

## 🚢 Deployment

The application can be easily deployed to various platforms:

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/roiLeo/oh-my-recipes)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/roiLeo/oh-my-recipes)

For more deployment options, check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Here are some ways you can contribute:

- Add new recipes
- Improve the UI/UX
- Fix bugs
- Add new features
- Improve documentation

### Development Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

The project uses Husky to run pre-commit hooks that check code quality with ESLint and Prettier.

## 🙏 Acknowledgments

- Built with [Nuxt](https://nuxt.com/)
- UI components from [Nuxt UI](https://ui.nuxt.com/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by [roiLeo](https://github.com/roiLeo)
