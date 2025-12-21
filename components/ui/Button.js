import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

const Root = styled(TouchableOpacity)`
  background-color: ${props => props.variant === 'ghost' ? 'transparent' : props.theme.COLORS.primary};
  padding-vertical: ${props => props.theme.SIZES.sm}px;
  padding-horizontal: ${props => props.theme.SIZES.md}px;
  border-radius: ${props => props.theme.SIZES.radius}px;
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text`
  color: ${props => props.variant === 'ghost' ? props.theme.COLORS.primary : '#fff'};
  font-size: ${props => props.theme.TYPOGRAPHY.small}px;
  font-weight: ${props => props.theme.TYPOGRAPHY.weight.medium};
  font-family: ${props => props.theme.TYPOGRAPHY.fontFamily};
`;

export default function Button({ children, onPress, variant = 'default', style, ...rest }) {
  return (
    <Root onPress={onPress} activeOpacity={0.85} variant={variant} style={style} {...rest}>
      <Label variant={variant}>{children}</Label>
    </Root>
  );
}
