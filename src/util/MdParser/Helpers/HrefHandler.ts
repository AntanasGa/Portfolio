export default function(link: string, root?: string) {
  link = link.trim();
  if (link.toLowerCase().startsWith("javascript:")) {
    return "";
  }

  const fullLinkList = [
    "http://",
    "https://",
  ];
  const pathStartList = [
    "./",
    "/",
    "#",
  ];

  pathStartList.push(...fullLinkList);

  if (pathStartList.some(x => link.toLowerCase().startsWith(x))) {
    return link;
  }
  
  if (root === undefined) {
    return "http://" + link;
  }

  const prependRoot = fullLinkList.some(x => root.toLowerCase().startsWith(x)) ? root : `http://${root}`;
  const fullPath = new URL(link, prependRoot);
  return fullPath.toString();
}
