const { default: styled, css } = require("styled-components");

export const InputCampaña = styled.input`
${({ desavilitado }) => {
    let cssFinal = ''
    if (desavilitado === true) {
      cssFinal += `
      position: relative;
      border: 1px solid black;
      border-radius: 8px;
      padding: 5px;
          `
    }
    if (desavilitado === false) {
      cssFinal += `
      position: relative;
      border: none;
      padding: 5px;
          `
    }
    return css`
    ${cssFinal}
  `
  }}
`