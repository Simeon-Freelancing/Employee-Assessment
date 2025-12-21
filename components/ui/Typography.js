import styled from "styled-components/native";

const H1 = styled.Text`
  color: ${(props) => props.theme.COLORS.text};
  font-size: ${(props) => props.theme.TYPOGRAPHY.h1}px;
  font-weight: ${(props) => props.theme.TYPOGRAPHY.weight.bold};
  font-family: ${(props) => props.theme.TYPOGRAPHY.fontFamily};
  margin-bottom: ${(props) => props.theme.SIZES.sm}px;
`;

const H2 = styled.Text`
  color: ${(props) => props.theme.COLORS.text};
  font-size: ${(props) => props.theme.TYPOGRAPHY.h2}px;
  font-weight: ${(props) => props.theme.TYPOGRAPHY.weight.medium};
  font-family: ${(props) => props.theme.TYPOGRAPHY.fontFamily};
  margin-bottom: ${(props) => props.theme.SIZES.sm}px;
`;

const P = styled.Text`
  color: ${(props) => props.theme.COLORS.subtext};
  font-size: ${(props) => props.theme.TYPOGRAPHY.body}px;
  font-weight: ${(props) => props.theme.TYPOGRAPHY.weight.regular};
  font-family: ${(props) => props.theme.TYPOGRAPHY.fontFamily};
  line-height: 22px;
`;

const H3 = styled.Text`
  color: ${(props) => props.theme.COLORS.text};
  font-size: ${(props) => props.theme.TYPOGRAPHY.h3}px;
  font-weight: ${(props) => props.theme.TYPOGRAPHY.weight.medium};
  font-family: ${(props) => props.theme.TYPOGRAPHY.fontFamily};
  margin-bottom: ${(props) => props.theme.SIZES.sm}px;
`;

const Label = styled.Text`
  color: ${(props) => props.theme.COLORS.muted};
  font-size: ${(props) => props.theme.TYPOGRAPHY.small}px;
  font-weight: ${(props) => props.theme.TYPOGRAPHY.weight.medium};
  font-family: ${(props) => props.theme.TYPOGRAPHY.fontFamily};
`;

const Typography = {
  H1,
  H2,
  H3,
  P,
  Label,
};

export default Typography;
