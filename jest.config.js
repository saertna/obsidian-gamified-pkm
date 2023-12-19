module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^obsidian$': 'obsidian',
	},
	collectCoverage: true,
	collectCoverageFrom: ["./src/**"],
	coverageThreshold: {
		global: {
			lines: 4,
		},
	},
};
