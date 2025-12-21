import React from 'react';
import styled from 'styled-components/native';

const Root = styled.TextInput`
  background-color: ${props => props.theme.COLORS.surface};
  padding-vertical: ${props => props.theme.SIZES.sm}px;
  padding-horizontal: ${props => props.theme.SIZES.md}px;
  border-radius: ${props => props.theme.SIZES.radius}px;
  border-width: 1px;
  border-color: ${props => props.theme.COLORS.border};
  color: ${props => props.theme.COLORS.text};
  font-size: ${props => props.theme.TYPOGRAPHY.body}px;
  font-family: ${props => props.theme.TYPOGRAPHY.fontFamily};
`;

export default function Input(props) {
  const placeholder = props.placeholderTextColor ?? '#94A3B8';
  return <Root placeholderTextColor={placeholder} {...props} />;
}
