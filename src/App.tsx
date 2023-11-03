import MarkdownSection from './components/MarkdownSection';

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
  return <MarkdownSection markdown={ve} />;
}

export default App
