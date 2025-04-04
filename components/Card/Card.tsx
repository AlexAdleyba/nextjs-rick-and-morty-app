import { PropsWithChildren } from "react";
import styled from "styled-components";

type PropsType = {
  name: string;
};

export const Card = (props: PropsWithChildren<PropsType>) => {
  const { children, name } = props;

  return (
    <CardBlock>
      <Name>{name}</Name>
      {children}
    </CardBlock>
  );
};

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid #f3c0f8;
  box-shadow: 0 2px 3px 1px #c55fe6;
  border-radius: 15px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 24px;
`;
