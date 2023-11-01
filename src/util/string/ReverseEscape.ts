/**
 * reverses escaped characters,
 * because you either get `<script>` or &lt;script&gt; as a string literal
 * 
 * @param item marked escaped string
 * @returns 
 */
export default function(item: string) {
  return new DOMParser().parseFromString(item, "text/html").documentElement.textContent;
}
