# Contributing to HK Cyber Terminal Portfolio

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

**Expected Behavior:**
- Use welcoming and inclusive language
- Be respectful of differing opinions and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

**Unacceptable Behavior:**
- Harassment, discrimination, or hate speech
- Trolling or insulting/derogatory comments
- Personal or political attacks
- Publishing others' private information
- Conduct which could reasonably be considered inappropriate

---

## Getting Started

### Fork & Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/hk-cyber-terminal-portfolio.git
   cd hk-cyber-terminal-portfolio
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/HAliveKP/hk-cyber-terminal-portfolio.git
   ```

### Create a Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

---

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0 or yarn >= 3.0.0
- Git

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Gemini API key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Run Type Checking**
   ```bash
   npm run lint
   ```

---

## Making Changes

### File Structure
Respect the existing project structure:
```
src/
├── components/      # Reusable React components
├── data/           # Static data and configurations
├── types.ts        # TypeScript type definitions
├── App.tsx         # Root component
├── main.tsx        # Entry point
└── index.css       # Global styles

api/
└── index.ts        # Express server setup
```

### Before You Start
- Check existing issues and PRs to avoid duplicates
- Create an issue first for major features
- Discuss your approach in the issue
- Get feedback before implementing

### During Development
- Keep commits atomic and logical
- Test your changes thoroughly
- Maintain backward compatibility when possible
- Document new features or API changes
- Update types in `types.ts` if needed
- Keep components in `components/` organized

---

## Commit Guidelines

### Commit Message Format
Follow conventional commits:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, or tooling changes

### Examples
```
feat(terminal): add real-time diagnostics panel
fix(leaderboard): correct score calculation algorithm
docs(readme): update installation instructions
refactor(api): simplify Gemini API integration
```

### Best Practices
- Write in imperative mood ("add feature" not "added feature")
- Don't capitalize the subject line
- Limit subject to 50 characters
- Wrap body at 72 characters
- Reference issues: "Fixes #123"

---

## Pull Request Process

### Before Submitting
1. Update your branch:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Test thoroughly:
   ```bash
   npm run lint
   npm run build
   ```

3. Ensure clean commit history:
   ```bash
   git log upstream/main..HEAD
   ```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing Done
Describe testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
```

### PR Review
- Maintainers will review your PR
- Respond to feedback promptly
- Make requested changes in new commits
- Keep the conversation respectful and collaborative

### Merge Criteria
- ✅ All checks pass
- ✅ At least one approval from maintainer
- ✅ No conflicts with main branch
- ✅ Follows project guidelines

---

## Coding Standards

### TypeScript
- Use strict type checking
- Avoid `any` types unless absolutely necessary
- Add types for function parameters and returns
- Use interfaces over types where applicable
- Export types from `types.ts`

### React Components
- Use functional components with hooks
- Keep components focused and reusable
- Name components PascalCase
- Props should be TypeScript interfaces
- Add comments for complex logic

### Code Style
- Use 2 spaces for indentation
- Use single quotes for strings
- Use template literals for multi-line strings
- Use meaningful variable names
- Keep functions small and focused

### CSS/Tailwind
- Use Tailwind utility classes primarily
- Create custom classes only when necessary
- Follow mobile-first responsive design
- Use consistent spacing scales

---

## Issue Guidelines

### Creating an Issue
- Search existing issues first
- Use clear, descriptive titles
- Provide reproduction steps for bugs
- Include environment details
- Include relevant screenshots/logs

### Issue Types

**Bug Report**
- Describe the bug clearly
- Steps to reproduce
- Expected vs actual behavior
- System information

**Feature Request**
- Explain the use case
- Describe desired behavior
- Provide mockups if possible
- Discuss potential implementation

**Documentation**
- Specify what needs updating
- Suggest improvements
- Link relevant code sections

---

## Questions & Support

- 💬 **Questions:** Open a Discussion or Issue
- 🐛 **Bugs:** Create a Bug Report Issue
- 💡 **Features:** Create a Feature Request Issue
- 📧 **Contact:** Reach out to maintainers

---

## Recognition

Contributors will be recognized in:
- This CONTRIBUTING.md file
- Project README
- GitHub contributors page

Thank you for making this project better! 🎉
