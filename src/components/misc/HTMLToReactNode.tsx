import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ParseToReactNode from 'html-react-parser';

type Props = {
  content: string;
};

const HTMLToReactNode: NextPage<Props> = ({ content }: Props) => {
  const [hasRendered, setHasRendered] = useState<boolean>(false);

  useEffect(() => void setHasRendered(true), []);

  return <>{hasRendered && ParseToReactNode(content)}</>;
};

export default HTMLToReactNode;
