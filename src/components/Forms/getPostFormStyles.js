import styled from '@emotion/styled'
import styles from '../../Styles'

const getPostFormStyles = theme => {
  const Label = styled.label`
    display: block;
    width: max-content;
    border-bottom: 2px solid ${theme.primary};
    margin-bottom: ${styles.space.s};
  `

  const FormGroup = styled.div`
    margin-bottom: ${styles.space.m};
    &.title {
      grid-area: titl;
    }
    &.story {
      grid-area: text;
    }
    &.date {
      grid-area: date;
    }
    &.category {
      grid-area: cate;
    }
    &.img {
      grid-area: imeg;
    }
    &.public {
      grid-area: publ;
    }

    .input.text {
      box-sizing: border-box;
      display: block;
      width: 100%;
      background: ${theme.fieldBackground};
      padding: ${styles.space.s};
      border: none;
      color: inherit;
    }
    textarea.input.text {
      height: 50vh;
      min-height: 200px;
      &::-webkit-scrollbar {
        width: 0.9rem;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #333436;
      }
    }

    .react-datepicker-wrapper {
      width: 100%;
    }
  `

  const CheckBoxWrapper = styled.label`
    margin: 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    span {
      width: max-content;
      margin-right: 10px;
    }

    input {
      height: 1.5rem;
      width: 1.5rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      border: 1px solid ${theme.text};
      border-radius: ${styles.radius.s};
      outline: none;
      transition-duration: 0.3s;
      cursor: pointer;
    }

    input:checked {
      border: 1px solid ${theme.primary};
      background-color: #34495e;
    }
  `

  const CheckField = styled.div`
    display: grid;
    grid: 1rem / 1rem;
    place-items: center;
    svg,
    input {
      grid-column: 1;
      grid-row: 1;
    }
    svg {
      order: 3;
      max-width: 70%;
      max-height: 70%;
    }
  `
  const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: ${theme.fieldBackground};
    padding: ${styles.space.s};
  `

  const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 250px;
    grid-gap: ${styles.space.l};
  `

  const HasDraftInfo = styled.div`
    background: ${theme.secondary};
    border-radius: ${styles.radius.m};
    padding: ${styles.space.m};
    margin-bottom: ${styles.space.m};
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
    }
  `

  const DeleteExperienceSection = styled.div`
    border-top: 1px solid ${theme.secondary};
    margin-top: ${styles.space.xxl};
    margin-bottom: ${styles.space.xl};
    padding-top: ${styles.space.xxl};
    display: flex;
    justify-content: center;
  `

  return {
    Label,
    FormGroup,
    CheckBoxWrapper,
    CheckField,
    CategoriesContainer,
    ImagesContainer,
    HasDraftInfo,
    DeleteExperienceSection,
  }
}

export default getPostFormStyles
