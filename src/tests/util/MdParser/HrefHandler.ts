import { it } from 'vitest';
import HrefHandler from '~/util/MdParser/Helpers/HrefHandler';

it.concurrent("Should work with absolute paths", ({ expect }) => {
  const expectedUri = "/a";
  const uri = HrefHandler(expectedUri);

  expect(uri).toBeDefined();
  expect(uri).toBe(expectedUri);
});

it.concurrent("Shoult work with relative paths", ({ expect }) => {
  const expectedUri = "./a";
  const uri = HrefHandler(expectedUri);

  expect(uri).toBeDefined();
  expect(uri).toBe(expectedUri);
});

it.concurrent("Should work with hash paths", ({ expect }) => {
  const expectedUri = "#a";
  const uri = HrefHandler(expectedUri);

  expect(uri).toBeDefined();
  expect(uri).toBe(expectedUri);
});

it.concurrent("Should work with full path", ({ expect }) => {
  const expectedUri = "https://antanasga.lt/en";
  const uri = HrefHandler(expectedUri);

  expect(uri).toBeDefined();
  expect(uri).toBe(expectedUri);
});

it.concurrent("Should fill prefix", ({ expect }) => {
  const initialUri = "antanasga.lt/en";
  const expectedUri = `http://${initialUri}`;
  const uri = HrefHandler(initialUri);

  expect(uri).toBeDefined();
  expect(uri).toBe(expectedUri);
});

it.concurrent("Should fill base", ({ expect }) => {
  const initialUri = "en";
  const baseUri = "https://antanasga.lt/";
  const uri = HrefHandler(initialUri, baseUri);
  const expectedUri = new URL(initialUri, baseUri);
  
  expect(uri).toBeDefined();
  expect(uri).toBe(expectedUri.toString())
});

it.concurrent("Should prefill root for url", ({ expect }) => {
  const initialUri = "en";
  const baseUri = "antanasga.lt/";
  const uri = HrefHandler(initialUri, baseUri);
  const expectedUri = new URL(initialUri, `http://${baseUri}`);

  expect(uri).toBeDefined();
  expect(uri).toBe(expectedUri.toString());
});
