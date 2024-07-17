module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["implement", "fix", "docs", "feature", "refactor", "test", "revert", "merge", "reviewfixes"]],
    "type-empty": [2, "never"],
    "scope-case": [1, "always"],
    "subject-empty": [2, "never"],
    "header-max-length": [1, "always", 100],
  },
};
