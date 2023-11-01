import { createElement, useMemo } from 'react'
import MdParser from './util/MdParser';

const ve =`<a href="./a"><img width="60px" height="60px" src="https://cdn.antanasga.lt/bitmap.webp" align="right" /></a>
<a>

fee \`foo\`
\`\`\`
hello
\`\`\`

</a>

<script></script>

>> Inserted
>
> bee
1. [ ] item

![Alt text](https://cdn.antanasga.lt/bitmap.webp "a title")

## h2
|a|b|
|-|-|
|c|d|
`

function App() {
  const items = useMemo(() => {
    const start = performance.now(); 
    const parsed = MdParser(ve);
    const end = performance.now();
    console.log(end - start);
    return parsed;
  }, []);
  return createElement("section", { style: { width: "100vw" }}, items);
}

export default App
