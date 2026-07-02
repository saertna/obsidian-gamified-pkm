export class App { }
export class TFile { }

export const Notice = jest.fn();

export class Plugin {
	app: any;
	loadData() { return {}; }
	saveData() {}
}
