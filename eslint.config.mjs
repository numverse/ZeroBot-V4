/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import codeComplete from "eslint-plugin-code-complete";
import deMorgan from "eslint-plugin-de-morgan";
import eslint from "@eslint/js";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import importNewlines from "eslint-plugin-import-newlines";
import sortPropertiesPlugin from "eslint-plugin-sort-properties";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["node_modules/"],
  },
  eslint.configs.recommended,
  stylistic.configs.customize({
    severity: "warn",
  }),
  eslintPluginUnicorn.configs.recommended,
  deMorgan.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "code-complete": codeComplete,
      "import-newlines": importNewlines,
      "sort-properties": sortPropertiesPlugin,
    },
    rules: {
      "@stylistic/arrow-parens": ["warn", "always"],

      "@stylistic/brace-style": ["warn", "1tbs"],
      "@stylistic/member-delimiter-style": ["warn", {
        multiline: {
          delimiter: "semi",
        },
        singleline: {
          delimiter: "semi",
        },
      }],
      "@stylistic/object-curly-newline": ["warn", {
        ExportDeclaration: {
          multiline: true,
        },
        ImportDeclaration: {
          multiline: true,
        },
        ObjectExpression: {
          minProperties: 1,
          multiline: true,
        },
        ObjectPattern: {
          multiline: true,
        },
      }],
      "@stylistic/object-curly-spacing": ["warn", "always"],

      "@stylistic/object-property-newline": ["warn", {
        allowAllPropertiesOnSameLine: false,
      }],
      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/semi": ["warn", "always"],
      "@typescript-eslint/consistent-type-exports": ["warn", {
        fixMixedExportsWithInlineTypeSpecifier: true,
      }],
      "@typescript-eslint/consistent-type-imports": ["warn", {
        fixStyle: "inline-type-imports",
        prefer: "type-imports",
      }],
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-readonly": "warn",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      "array-callback-return": "error",

      "code-complete/no-boolean-params": "warn",

      "curly": ["warn", "all"],
      "eqeqeq": ["error", "always"],
      "import-newlines/enforce": ["warn", {
        items: 1,
      }],
      "max-params": ["error", {
        max: 2,
      }],
      "no-else-return": ["error", {
        allowElseIf: false,
      }],
      "no-magic-numbers": ["warn", {
        enforceConst: true,
        ignore: [-1, 0, 1],
        ignoreArrayIndexes: true,
        ignoreClassFieldInitialValues: true,
        ignoreDefaultValues: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreTypeIndexes: true,
      }],
      "no-nested-ternary": "warn",
      "no-param-reassign": ["warn", {
        props: true,
      }],
      "no-shadow": ["warn", {
        builtinGlobals: true,
        hoist: "all",
      }],
      "no-undef": "off",
      "no-unneeded-ternary": "warn",
      "object-shorthand": ["warn", "always"],
      "prefer-arrow-callback": "warn",
      "prefer-template": "warn",
      "preserve-caught-error": "warn",
      "sort-imports": ["warn", {
        ignoreCase: true,
      }],
      "sort-keys": ["warn", "asc", {
        allowLineSeparatedGroups: true,
        caseSensitive: false,
        natural: true,
      }],
      "sort-properties/sort-interface": ["warn", {
        allowLineSeparatedGroups: false,
        caseSensitive: false,
      }],
      "sort-properties/sort-object-destructing": ["warn", {
        allowLineSeparatedGroups: false,
        caseSensitive: false,
      }],
      "sort-properties/sort-object-expression": ["warn", {
        allowLineSeparatedGroups: false,
        caseSensitive: false,
      }],
      "sort-properties/sort-type-literal": ["warn", {
        allowLineSeparatedGroups: false,
        caseSensitive: false,
      }],

      "unicorn/filename-case": [
        "warn",
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      "unicorn/prefer-module": "off",
      "unicorn/prefer-ternary": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
];
