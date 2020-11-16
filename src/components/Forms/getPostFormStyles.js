import styled from '@emotion/styled'
import styles from '@styles/'

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

  const ChipWrapper = styled.div`
    margin: 5px;
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
    CategoriesContainer,
    ImagesContainer,
    HasDraftInfo,
    DeleteExperienceSection,
    ChipWrapper,
  }
}

export default getPostFormStyles
