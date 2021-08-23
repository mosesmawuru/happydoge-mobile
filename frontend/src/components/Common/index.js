import React from 'react';
import styled from 'styled-components/native';

export const FlexLayout = styled.View`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  background-color: ${props => props.backgroundColor || 'transparent'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  margin: ${props => props.margin || '0'};
`;
export const CommonText = styled.Text`
  color: ${props => props.color || 'white'};
  background-color: ${props => props.backgroundColor || 'transparent'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '20px'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-weight: ${props => props.fontWeight || 'bold'};
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxWidth || 'auto'};
  min-width: ${props => props.minWidth || 'auto'};
  text-align: ${props => props.align || 'center'};
`;
export const CommonInput = styled.TextInput`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  font-size: ${props => props.fontSize || '20px'};
  border-color: ${props => props.borderColor || 'transparent'};
  border-width: ${props => props.borderWidth || 0};
  border-radius: ${props => props.borderRadius || 0};
`;
