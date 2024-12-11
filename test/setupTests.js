require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('util');
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;