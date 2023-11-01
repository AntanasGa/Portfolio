export default function(link: string, root?: string) {
  link = link.trim();
  if (link.toLowerCase().startsWith("javascript:")) {
    return "";
  }
  const pathStartList = [
    "./",
    "/",
    "#",
    "http://",
    "https://",
  ];

  if (pathStartList.some(x => link.toLocaleLowerCase().startsWith(x))) {
    return link;
  }
  
  if (root === undefined) {
    return "http://" + link;
  }
  //TODO: add configuration
  return link;
}
