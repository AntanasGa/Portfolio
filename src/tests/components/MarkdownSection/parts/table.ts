import { describe, it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

describe("table", () => {
  const helloContent = "hello";
  it.concurrent("Should have table with hello and 1 table rows", ({ expect }) => {
    const { testId, render } = getRender(`|${helloContent}|${helloContent}|
|-|-|
|${helloContent}|${helloContent}|
`);
    const section = render.getByTestId(testId);
    
    expect(section).toBeDefined();
    
    const tableElementList = Array.from(section.querySelectorAll("table") ?? []);
    
    expect(tableElementList.length).toBe(1);

    const tableElement = firstOrUndefinedOf(tableElementList);

    expect(tableElement).toBeDefined();
    expect(Array.from(tableElement?.children ?? []).length).toBe(2);
    
    const thead = tableElement?.querySelector("thead");
    
    expect(thead).toBeDefined();
    expect(Array.from(thead?.children ?? []).length).toBe(1);
    
    const theadRowList = thead?.querySelectorAll("tr");
    expect(Array.from(theadRowList ?? []).length).toBe(1);

    const theadRowColumnList = thead?.querySelectorAll("th");
    expect(Array.from(theadRowColumnList ?? []).length).toBe(2);
    for (const cell of Array.from(theadRowColumnList ?? [])) {
      expect(cell.innerHTML).toBe(helloContent);
    }
    const tbody = tableElement?.querySelector("tbody");
    
    expect(tbody).toBeDefined();
    expect(Array.from(tbody?.children ?? []).length).toBe(1);

    for (const row of Array.from(tbody?.children ?? [])) {
      expect(row).toBeDefined();
      const rowCellList = Array.from(row.children ?? []);
      expect(rowCellList.length).toBe(2);
      expect(rowCellList.every(x => x.tagName.toLowerCase() === "td")).toBe(true);
      expect(rowCellList.every(x => x.innerHTML === helloContent)).toBe(true);
    }
  });

  it.concurrent("Should have table with hello and 2 table rows", ({ expect }) => {
    const { testId, render } = getRender(`|${helloContent}1|${helloContent}2|
|-|-|
|${helloContent}1|${helloContent}2|
|${helloContent}1|${helloContent}2|
`);
    const section = render.getByTestId(testId);
    
    expect(section).toBeDefined();
    
    const tableElementList = Array.from(section.querySelectorAll("table") ?? []);
    
    expect(tableElementList.length).toBe(1);

    const tableElement = firstOrUndefinedOf(tableElementList);

    expect(tableElement).toBeDefined();
    expect(Array.from(tableElement?.children ?? []).length).toBe(2);
    
    const thead = tableElement?.querySelector("thead");
    
    expect(thead).toBeDefined();
    expect(Array.from(thead?.children ?? []).length).toBe(1);
    
    const theadRowList = thead?.querySelectorAll("tr");
    expect(Array.from(theadRowList ?? []).length).toBe(1);

    const theadRowColumnList = thead?.querySelectorAll("th");
    expect(Array.from(theadRowColumnList ?? []).length).toBe(2);
    for (const [index, cell] of Object.entries(Array.from(theadRowColumnList ?? []))) {
      expect(cell.innerHTML).toBe(helloContent + (+index + 1));
    }
    const tbody = tableElement?.querySelector("tbody");
    
    expect(tbody).toBeDefined();
    expect(Array.from(tbody?.children ?? []).length).toBe(2);

    for (const row of Array.from(tbody?.children ?? [])) {
      expect(row).toBeDefined();
      const rowCellList = Array.from(row.children ?? []);
      expect(rowCellList.length).toBe(2);
      expect(rowCellList.every(x => x.tagName.toLowerCase() === "td")).toBe(true);
      expect(rowCellList.every((x, i) => x.innerHTML === helloContent + (i + 1))).toBe(true);
    }
  });
});
