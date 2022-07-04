import { FaSave } from 'react-icons/fa'
import { MdCloudUpload } from 'react-icons/md'

const ModalEditarBanner = ({ closeModal }) => {
  return (
    <>
    <div className="modal__banner--overlay">
      <div className="modal__banner--container">
        <div className="modal__banner--wrapper">
          <div className="modal__banner--content">
            <div className="modal__banner--close" onClick={closeModal}>X CERRAR</div>
            <h3 className="modal__banner--title">Editor de banner principal</h3>
            <div className="modal__banner--form">
              <div className="modal__banner--figure">
                <img src={'/images/file-imagen.svg'} alt="" className="img-not-found"/>
              </div>
              <div className="modal__banner--form-group">
                <label htmlFor="">Link del botón banner</label>
                <input type='text' defaultValue='www.cieneguilla.com.pe/campaña/2333-fiestas-patrias'/>
              </div>
              <div className="modal__banner--group-end">
                <div className="modal__banner--form-group form_group--2">
                  <label htmlFor="">Etiqueta de botón</label>
                  <input type='text' placeholder='Nombre de botón'/>
                </div>
                <div className="modal__banner--buttons">
                  <button><MdCloudUpload size='1.5em'/> Cargar</button>
                  <button><FaSave size='1.3em'/> Guardar</button>
                </div>
              </div>
            </div>
            <div className="modal__banner--pagination">
              <button className="button__pagination"></button>
              <button className="button__pagination"></button>
              {/* <label for="input1"></label>
              <input  id="input1" name="radio" type="radio" />
              <label for="input2"></label>
              <input  id="input2" name="radio" type="radio" />
              <span id="slider"></span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>{/*css*/`
      .modal__banner--overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.21);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .modal__banner--container {
        width: 944px;
        height: 767px;
        background: #FFFFFF;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
      }
      .modal__banner--wrapper {
        padding: 1.5rem 3rem;
      }
      .modal__banner--content {
        
      }
      .modal__banner--content h3 {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #4C2913;
      }
      .modal__banner--close {
        font-style: normal;
        font-weight: 800;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
        display: flex;
        // justify-content: flex-end;
        cursor: pointer;
        width: 70px;
        margin-left: 49rem;
      }
      .modal__banner--title {
        text-align: center;
        margin-bottom: 2rem;
      }
      .modal__banner--figure {
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        width: 100%;
        height: 374px;
        margin-bottom: 2rem;

        display: flex;
        justify-content: center;
        align-items: center;
      }
      .img-not-found {
        width: 109px;
        height: 106px;
      }

      .modal__banner--form-group {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        gap: 1rem;
      }
      .modal__banner--form-group label {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #4C2913;
      }
      .modal__banner--form-group input {
        height: 56px;
        border: 1px solid #565656;
        border-radius: 5px;
        padding: 0 1rem;
      }
      .modal__banner--group-end {
        display: flex;
        align-items: end;
        justify-content: space-between;
      }
      .form_group--2 {
        width: 50%
      }
      .modal__banner--buttons {
        display: flex;
        gap: 1rem;
        width: 30%
      }
      .modal__banner--buttons button {
        background-color: white;
        border: 1px solid #08bc62;
        color: #08bc62;
        font-size: 15px;
        padding: 0 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
        width: 100%;
        height: 40px;
        gap: .5rem;
      }
      .modal__banner--buttons button:hover {
        background-color: #08bc62;
        color: #fff;
        transition: background-color .4s ease-in-out;
      }
      .modal__banner--pagination {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        gap: .5rem;
      }

      .button__pagination {
        width: 24px;
        height: 24px;
        background: #F8F7F7;
        border: 1px solid #000000;
        border-radius: 50%;
        cursor: pointer;
      }
      .button__pagination ::after {
        background: #888888;
      }

      #radios {
        position:relative;
        width:50%;
        margin:0 auto;
      }
      #radios input[type="radio"]{
        position:absolute;
        right:1000%;
      }
      #radios label{
        float:left;
        width:10%;
        padding-bottom:15%;
        margin:0 2.5%;
        background:rgba(255,255,255,.2);
        border-radius:50%;
        cursor:pointer;
      }
      #slider{
        position:absolute;
        left:0%; top:0;
        width:10%; padding-bottom:10%;
        margin:2.5% 0 0 5%;
        background:#fff;
        transition:transform 1s;
        border-radius:50%;
        animation-timing-function: ease-in-out;
        animation-duration:.3s;
        animation-fill-mode: forwards;
        transition: 0.2s left .05s ease-in-out;
      }
      
      #input1:checked  ~ #slider{ animation-name: input1; left:0; }
      #input2:checked  ~ #slider{ animation-name: input2; left:20%; }

      @keyframes input1{ 30%, 70% { transform:scale(0.5); } }
      @keyframes input2{ 30%, 70% { transform:scale(0.5); } }

    `}</style>
    </>
  )
}
export default ModalEditarBanner