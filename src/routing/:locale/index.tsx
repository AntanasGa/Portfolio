import { useContext, useMemo } from 'react';
import { ManifestStateContext } from '../../reducers/manifest';
import ArticleTag from '../../components/ArticleTag';

function Locale$Index() {
  const manifestState = useContext(ManifestStateContext);
  const tags = useMemo(() => Object.entries(manifestState.tags).sort(([a], [b]) => (+a) - (+b))/*.filter(([_, v]) => v.tagged)*/, [ manifestState ]);
  return (
    <>
      {
        tags.map(([k, v]) =>
          <ArticleTag key={k} item={v} />
        )
      }
    </>
  )
}

export default Locale$Index;
