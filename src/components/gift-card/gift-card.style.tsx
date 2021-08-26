import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import css from '@styled-system/css';
export const GiftCardWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  display: flex;
  flex-direction: column;
`;

export const Discount = styled.div<any>(
  css({
    position: 'absolute',
    zIndex: 1,
    top: '10px',
    left: '10px',
    backgroundColor: 'primary.regular',
    color: '#fff',
    overflow: 'hidden',
    padding: '0.25rem 0.5rem',
    fontSize: 12,
    borderRadius: 6,
    pointerEvents: 'none',
  })
);
export const GiftCardImageWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 160px;
  max-height: 240px;
  position: relative;
  text-align: center;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${themeGet('colors.gray.500', '#f1f1f1')};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 767px) {
    height: auto;
    max-height: 220px;
  }

  @media (max-width: 490px) {
    max-height: none;
  }
`;

export const CardInfo = styled.div`
  padding: 0px 15px;
`;

export const CardContent = styled.div`
  background-color: ${themeGet('colors.white', '#ffffff')};
  overflow: hidden;
  border: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  border-top: 0;
  border-bottom-left-radius: ${themeGet('radii.base', '6px')};
  border-bottom-right-radius: ${themeGet('radii.base', '6px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

export const GiftCode = styled.input`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  margin: 0;
  border: 0;
  outline: 0;
  padding: 0;
  width: 100%;

  @media (max-width: 767px) {
    font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
  }
`;

