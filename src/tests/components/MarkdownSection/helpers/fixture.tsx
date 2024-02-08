import { render } from '@testing-library/react';
import MarkdownSection from '~/components/MarkdownSection';
import { ConfigContext } from '~/util/MdParser/types';
import { uuidv4 } from '~/util/string/Guid';

export const getRender = (content: string = "", config?: ConfigContext) => {
  const testId = uuidv4();
  return {testId, render: render(<MarkdownSection markdown={ content } testId={ testId } config={ config } />)};
}
