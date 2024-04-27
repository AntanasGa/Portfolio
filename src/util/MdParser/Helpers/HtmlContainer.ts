import { ReactNode, createElement } from "react";
import { uuidv4 } from "~/util/string/Guid";
import { DynamicComponent } from "./types";

export default class HtmlContainer {
  private _parent?: HtmlContainer;
  private _isRaw: boolean;
  context: (HtmlContainer | ReactNode)[];
  tag: DynamicComponent;
  attributeMap?: Record<string, unknown>;

  constructor(parent: HtmlContainer | undefined, tag: DynamicComponent, attributeMap?: Record<string, unknown>, isRaw: boolean = false) {
    this._parent = parent;
    this._isRaw = isRaw;
    this.tag = tag;
    this.attributeMap = attributeMap;
    this.context = [];
  }

  get parent() {
    return this._parent;
  }

  root(): HtmlContainer {
    return this.parent?.root() ?? this;
  }

  push(tag: DynamicComponent, attributeMap?: Record<string, unknown>, isRaw: boolean = false) {
    const innerContext = new HtmlContainer(this, tag, attributeMap, isRaw);
    this.context.push(innerContext);
    return innerContext;
  }

  closestRaw(): HtmlContainer | undefined {
    return this._isRaw ? this : (this.parent?.closestRaw() ?? this);
  }

  generateComponent(): ReactNode {
    this.attributeMap ??= {};
    this.attributeMap.key ??= uuidv4();
    return createElement(this.tag, this.attributeMap, this.context.length ? this.context.map(x => x instanceof HtmlContainer ? x.generateComponent() : x) : undefined);
  }
}
