# @mochiya98/date-only

[![npm (scoped)](https://img.shields.io/npm/v/mochiya98/date-only?style=flat-square)](https://www.npmjs.com/package/@mochiya98/date-only) [![Travis (.com)](https://img.shields.io/travis/com/mochiya98/date-only?style=flat-square)](https://travis-ci.com/github/mochiya98/date-only) [![Coveralls github](https://img.shields.io/coveralls/github/mochiya98/date-only?style=flat-square)](https://coveralls.io/github/mochiya98/date-only) ![license MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

manage a calendar date easily

## Usage

```bash
npm i @mochiya98/date-only
```

```tsx
import { DateOnly } from "@mochiya98/date-only";

const date = DateOnly.fromText("08/01/2020", "MM/DD/YYYY");
console.log(date.toString()); // "2020-08-01"

const tomorrow = date.add(1);
console.log(tomorrow.toString()); // "2020-08-02"
```

see more details: [docs](https://github.m98.be/date-only/)
