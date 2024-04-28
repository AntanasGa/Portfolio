const titlePrefix = "Portfolio";

export default function setTitle(title: string) {
  document.title = [titlePrefix, title].join(" | ");
}
