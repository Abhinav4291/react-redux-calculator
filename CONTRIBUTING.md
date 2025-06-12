# Contributing to Abhinav Calculator

## Git Workflow

We follow a feature-branch workflow. Here's how to contribute:

1. Fork the repository
2. Create a new branch from `main` for your feature
   ```sh
   git checkout -b feat/your-feature-name
   ```
   
   Branch naming conventions:
   - `feat/` - for new features
   - `fix/` - for bug fixes
   - `docs/` - for documentation changes
   - `refactor/` - for code refactoring
   - `test/` - for adding tests
   - `chore/` - for maintenance tasks

3. Make your changes in small, atomic commits
4. Push your branch and create a Pull Request

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Each commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(calculator): add percentage calculation feature
fix(display): resolve number overflow issue
docs(readme): update installation instructions
test(operations): add unit tests for division
```

## Pull Request Process

1. Ensure your PR addresses a specific issue or feature
2. Update documentation as needed
3. Keep PRs small and focused
4. Write clear PR descriptions
5. Reference related issues in PR description

## Code Review

- All changes must be reviewed before merging
- Address review comments promptly
- Keep discussions focused and professional
- Request reviews from maintainers

## Development Guidelines

1. Write clean, maintainable code
2. Follow existing code style
3. Add tests for new features
4. Update documentation as needed
5. Test your changes locally before pushing 