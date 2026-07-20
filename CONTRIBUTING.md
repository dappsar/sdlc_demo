# Contributing

## Branches

- Create feature branches from `dev` using `feature/<short-description>`.
- Open pull requests into `dev` for regular changes.
- Promote validated changes from `dev` to `main` through a pull request.
- Do not push directly to `main`.

## Local validation

```bash
npm ci
npm run validate
```

## Commit guidance

Use focused commits and conventional prefixes when practical:

- `feat:` new functionality
- `fix:` bug fix
- `test:` tests
- `docs:` documentation
- `ci:` automation
- `refactor:` internal code change without behavior changes
