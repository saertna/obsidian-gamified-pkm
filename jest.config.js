/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
	collectCoverageFrom: ["./src/**"],
	coverageThreshold: {
		"global": {
		"lines": 4
	}},
};