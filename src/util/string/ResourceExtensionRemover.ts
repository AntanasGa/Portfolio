export default function ResourceExtensionRemover(resource?: string) {
  return resource?.replace(/(\.md)$/ig, "");
}
