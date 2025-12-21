import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Container = styled(View)`
  background-color: ${props => props.transparent ? 'transparent' : props.theme.COLORS.surface};
  padding-vertical: ${props => props.theme.SIZES.md}px;
  padding-horizontal: ${props => props.theme.SIZES.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.COLORS.border};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: ${props => props.theme.COLORS.text};
  font-size: ${props => props.theme.TYPOGRAPHY.h2}px;
  font-weight: ${props => props.theme.TYPOGRAPHY.weight.bold};
  font-family: ${props => props.theme.TYPOGRAPHY.fontFamily};
`;

export default function Header({ title, left, right, transparent }) {
  return (
    <Container transparent={transparent}>
      {left || <View style={{ width: 36 }} />}
      <Title numberOfLines={1}>{title}</Title>
      {right || <View style={{ width: 36 }} />}
    </Container>
  );
}
