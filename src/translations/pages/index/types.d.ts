import { Routable } from "../types";

export interface IndexPageNamespace extends Routable {
  linkToOrigins: string,
  name: string,
  technologies: string,
  developingSince: string,
}
