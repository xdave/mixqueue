import * as chai from "chai";
// import * as chaiEnzyme from 'chai-enzyme';
// chai.use(chaiEnzyme());

(global as any).fetch = require("node-fetch");

export { expect } from "chai";
export { shallow } from "enzyme";
export { spy } from "sinon";
