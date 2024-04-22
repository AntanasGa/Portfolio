/**
 * reverses escaped characters,
 * because you either get `<script>` or &lt;script&gt; as a string literal
 * 
 * @param item marked escaped string
 * @returns 
 */
export default function(item: string) {
  // Wrapping in pre tag to preserve spaces
  return new DOMParser().parseFromString(`<pre>${item}</pre>`, "text/html").body.firstChild?.textContent;
}
