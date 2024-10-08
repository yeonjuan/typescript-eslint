import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from '../../src/rules/prefer-literal-enum-member';

const ruleTester = new RuleTester();

ruleTester.run('prefer-literal-enum-member', rule, {
  valid: [
    `
enum ValidRegex {
  A = /test/,
}
    `,
    `
enum ValidString {
  A = 'test',
}
    `,
    `
enum ValidLiteral {
  A = \`test\`,
}
    `,
    `
enum ValidNumber {
  A = 42,
}
    `,
    `
enum ValidNumber {
  A = -42,
}
    `,
    `
enum ValidNumber {
  A = +42,
}
    `,
    `
enum ValidNull {
  A = null,
}
    `,
    `
enum ValidPlain {
  A,
}
    `,
    `
enum ValidQuotedKey {
  'a',
}
    `,
    `
enum ValidQuotedKeyWithAssignment {
  'a' = 1,
}
    `,
    `
enum ValidKeyWithComputedSyntaxButNoComputedKey {
  ['a'],
}
    `,
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 >> 0,
  C = 1 >>> 0,
  D = 1 | 0,
  E = 1 & 0,
  F = 1 ^ 0,
  G = ~1,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 >> 0,
  C = A | B,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 >> 0,
  C = Foo.A | Foo.B,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 >> 0,
  C = Foo['A'] | B,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  ['A-1'] = 1 << 0,
  C = ~Foo['A-1'],
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 << 1,
  C = 1 << 2,
  D = A | B | C,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 << 1,
  C = 1 << 2,
  D = Foo.A | Foo.B | Foo.C,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 << 1,
  C = 1 << 2,
  D = Foo.A | (Foo.B & ~Foo.C),
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 << 1,
  C = 1 << 2,
  D = Foo.A | -Foo.B,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
    },
  ],
  invalid: [
    {
      code: `
enum InvalidObject {
  A = {},
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 3,
          column: 3,
        },
      ],
    },
    {
      code: `
enum InvalidArray {
  A = [],
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 3,
          column: 3,
        },
      ],
    },
    {
      code: `
enum InvalidTemplateLiteral {
  A = \`foo \${0}\`,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 3,
          column: 3,
        },
      ],
    },
    {
      code: `
enum InvalidConstructor {
  A = new Set(),
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 3,
          column: 3,
        },
      ],
    },
    {
      code: `
enum InvalidExpression {
  A = 2 + 2,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 3,
          column: 3,
        },
      ],
    },
    {
      code: `
enum InvalidExpression {
  A = delete 2,
  B = -a,
  C = void 2,
  D = ~2,
  E = !0,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 3,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 4,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 5,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 6,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 7,
          column: 3,
        },
      ],
    },
    {
      code: `
const variable = 'Test';
enum InvalidVariable {
  A = 'TestStr',
  B = 2,
  C,
  V = variable,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 7,
          column: 3,
        },
      ],
    },
    {
      code: `
enum InvalidEnumMember {
  A = 'TestStr',
  B = A,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 4,
          column: 3,
        },
      ],
    },
    {
      code: `
const Valid = { A: 2 };
enum InvalidObjectMember {
  A = 'TestStr',
  B = Valid.A,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 5,
          column: 3,
        },
      ],
    },
    {
      code: `
enum Valid {
  A,
}
enum InvalidEnumMember {
  A = 'TestStr',
  B = Valid.A,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 7,
          column: 3,
        },
      ],
    },
    {
      code: `
const obj = { a: 1 };
enum InvalidSpread {
  A = 'TestStr',
  B = { ...a },
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 5,
          column: 3,
        },
      ],
    },
    {
      code: `
enum Foo {
  A = 1 << 0,
  B = 1 >> 0,
  C = 1 >>> 0,
  D = 1 | 0,
  E = 1 & 0,
  F = 1 ^ 0,
  G = ~1,
}
      `,
      options: [{ allowBitwiseExpressions: false }],
      errors: [
        {
          messageId: 'notLiteral',
          line: 3,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 4,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 5,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 6,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 7,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 8,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 9,
          column: 3,
        },
      ],
    },
    {
      code: `
const x = 1;
enum Foo {
  A = x << 0,
  B = x >> 0,
  C = x >>> 0,
  D = x | 0,
  E = x & 0,
  F = x ^ 0,
  G = ~x,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
      errors: [
        {
          messageId: 'notLiteral',
          line: 4,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 5,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 6,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 7,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 8,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 9,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 10,
          column: 3,
        },
      ],
    },
    {
      code: `
const x = 1;
enum Foo {
  A = 1 << 0,
  B = x >> Foo.A,
  C = x >> A,
}
      `,
      options: [{ allowBitwiseExpressions: true }],
      errors: [
        {
          messageId: 'notLiteral',
          line: 5,
          column: 3,
        },
        {
          messageId: 'notLiteral',
          line: 6,
          column: 3,
        },
      ],
    },
    {
      code: `
enum Foo {
  A,
  B = +A,
}
      `,
      errors: [
        {
          messageId: 'notLiteral',
          line: 4,
        },
      ],
    },
  ],
});
