module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^obsidian$': 'obsidian',
		'^obsidian-dataview$': '<rootDir>/tests/__mocks__/obsidian-dataview.ts',
	},
	collectCoverage: true,
	collectCoverageFrom: ["./src/**"],
	coverageThreshold: {
		global: {
			lines: 4,
		},
	},
};
