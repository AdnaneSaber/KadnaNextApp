import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SelectStyle = styled.div<any>`
  /* Select label default style */
  .Kanda__field-label {
    color: ${themeGet('colors.text.label', '#767676')};
    font-size: calc(${themeGet('fontSizes.base', '15')}px + 1px);
    font-weight: ${themeGet('fontWeights.medium', '500')};
  }

  /* Select label style when labelPosition on left */
  &.label_left {
    display: flex;
    align-items: center;
    .Kanda__field-label {
      margin-right: 10px;
    }
  }

  /* Select label style when labelPosition on right */
  &.label_right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    .Kanda__field-label {
      margin-left: 10px;
    }
  }

  /* Switch label style when labelPosition on top || bottom */
  &.label_top {
    .Kanda__field-label {
      display: flex;
      margin-bottom: 8px;
    }
  }
  &.label_bottom {
    .Kanda__field-label {
      display: flex;
      margin-top: 8px;
    }
  }
`;

SelectStyle.displayName = 'SelectStyle';

SelectStyle.defaultProps = {
  as: 'div',
};

export default SelectStyle;
