import { render } from '@testing-library/react';
import MarkdownSection from '../../../../components/MarkdownSection';

export const getRender = (content: string = "") => {
  const testId = "initializer-empty"
  return {testId, render: render(<MarkdownSection markdown={ content } testId={ testId } />)};
}
