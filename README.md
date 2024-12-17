# primitive-deep-equal

[![CodeQL](https://github.com/Pasan-Kottearachchi/primitive-deep-equal/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Pasan-Kottearachchi/primitive-deep-equal/actions/workflows/github-code-scanning/codeql)
[![codecov](https://codecov.io/github/Pasan-Kottearachchi/primitive-deep-equal/graph/badge.svg?token=I9LYGBJF4M)](https://codecov.io/github/Pasan-Kottearachchi/primitive-deep-equal)
![GitHub Release](https://img.shields.io/github/v/release/Pasan-Kottearachchi/primitive-deep-equal)
![NPM Version](https://img.shields.io/npm/v/primitive-deep-equal)

A lightweight and efficient utility for deep comparison of JavaScript objects and arrays. Easily check if two structures are deeply equal, even when nested.

### Features

- Handles deep equality checks for objects and arrays.
- Supports nested structures.
- Lightweight and dependency-free.

### Installation

Install the package via npm:

```sh
npm install primitive-deep-equal
```

### Usage

Import and use `isEqual` in your JavaScript or TypeScript project:

```typescript
import { isEqual } from 'primitive-deep-equal';

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };

console.log(isEqual(obj1, obj2)); // Output: true

const obj3 = { a: 1, b: { c: 3 } };
console.log(isEqual(obj1, obj3)); // Output: false
```

### API

#### `isEqual(value1: any, value2: any): boolean`

- **`value1`**: The first value to compare.
- **`value2`**: The second value to compare.
- **Returns**: `true` if the two values are deeply equal, otherwise `false`.

### License

This project is licensed under the ISC License.

### Reporting Issues

If you encounter bugs or have feature requests, please [open an issue](https://github.com/Pasan-Kottearachchi/primitive-deep-equal/issues).

### Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Clone the fork to your local machine (`git clone https://github.com/Pasan-Kottearachchi/primitive-deep-equal.git`).
3. Create a feature branch (`git checkout -b feature/your-feature`).
4. Commit your changes (`git commit -m "feat: add feature"`).
5. Push the branch (`git push origin feature/your-feature`).
6. Open a pull request.

For major changes, please open an issue to discuss your ideas beforehand.

