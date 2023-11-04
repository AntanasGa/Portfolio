import { render } from '@testing-library/react';
import MarkdownSection from '../../../../components/MarkdownSection';
import { ConfigContext } from '../../../../util/MdParser/types';

export const getRender = (content: string = "", config?: ConfigContext) => {
  const testId = "initializer-empty"
  return {testId, render: render(<MarkdownSection markdown={ content } testId={ testId } config={ config } />)};
}
