import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    // eslint-config-next 16 introduced a much stricter react-hooks ruleset.
    // These flag pre-existing patterns across the codebase; demote to warnings
    // so the upgrade can land without a repo-wide refactor. Tracked as debt.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
    },
  },
];

export default eslintConfig;
