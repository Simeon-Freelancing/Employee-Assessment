import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(10, 12, 20, 0.45);
  justify-content: center;
  align-items: center;
`;

const Content = styled(View)`
  background-color: ${props => props.theme.COLORS.surface};
  padding: ${props => props.theme.SIZES.lg}px;
  border-radius: ${props => props.theme.SIZES.radius}px;
  width: 92%;
`;

export default function Modal({ children }) {
  return (
    <Backdrop>
      <Content>{children}</Content>
    </Backdrop>
  );
}
