const { default: styled, css } = require("styled-components");

export const ButtonVisibilidad = styled.button`
font-size: 1.5rem;
background: none;
border: none;
margin: auto;
${({ visibilidad }) => {
    let cssFinal = ''
    if (visibilidad === true) {
      cssFinal += `
      color: #08bc62;
      text-align: center;
          `
    }
    if (visibilidad === false) {
      cssFinal += `
      color: #BFBFBF;
      text-align: center;
          `
    }
    return css`
    ${cssFinal}
  `
  }}
  &:hover {
      font-size: 2rem;
      margin: -0.5rem;
  }
`