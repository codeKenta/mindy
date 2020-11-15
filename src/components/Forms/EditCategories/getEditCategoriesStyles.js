import styled from '@emotion/styled'

export const ActionButtonsWrapper = styled.div`
  display: flex;
`

export const IconWrapper = styled.div`
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  border-radius: 50%;
  font-size: 20px;
  width: 3em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`
