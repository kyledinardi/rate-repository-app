import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  colorTextSecondary: { color: theme.colors.textSecondary },
  colorPrimary: { color: theme.colors.primary },
  colorError: { color: theme.colors.error },
  colorWhite: { color: 'white' },
  fontSizeSubheading: { fontSize: theme.fontSizes.subheading },
  fontWeightBold: { fontWeight: theme.fontWeights.bold },
  centered: { textAlign: 'center' },

  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
});

const Text = ({ color, fontSize, fontWeight, centered, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'error' && styles.colorError,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    centered === true && styles.centered,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
