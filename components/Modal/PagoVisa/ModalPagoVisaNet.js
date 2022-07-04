import React, { useState, useContext, useEffect } from 'react'
import { NotaVentaCtx } from '@/context/NotaVentaCtx'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('123456789', 7)
// import { useRouter } from 'next/router'

const ModalPagoVisaNet = ({ monto }) => {

  // const router = useRouter()
  // const [openModalPagoSatisfactorio, setOpenModalPagoSatisfactorio] = useState(false)  

  const { notaVenta } = useContext(NotaVentaCtx)

  // const sendPayment = () => {
  //   fetch(`${process.env.URI_API}/api-cieneguilla-service/notas-venta`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(notaVenta)
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setOpenModalPagoSatisfactorio(true)
  //       setTimeout(() => {
  //         router.push(`/detalle-compra/${res.body._id}`)
  //       }, 1200)
  //     })
  //     .catch(err => console.log(err.message))
  // }

  const formatToCurrency = amount => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  const openModalVisaNet = async () => {

    const codigoComercio = process.env.CODE_COMMERCE

    //456879852
    // Get token access (1)

    // const email = "integraciones@niubiz.com.pe"
    // const password = "_7z3@8fF"

    const email = "webmaster@cieneguillatours.com"
    const password = "k$8$90-J"
    const base64 = Buffer.from(`${email}:${password}`).toString('Base64')

    const headers = new Headers()
    headers.append('Authorization', `Basic ${base64}`)

    const tokenVisanet = await fetch(process.env.TOKEN_ACCESS, {
      method: 'POST',
      headers: headers
    })
      .then(res => res.text())
      .then((data) => data);

    // Get token session (2)

    const headers2 = new Headers()
    headers2.append('Content-Type', `application/json`)
    headers2.append('Authorization', `${tokenVisanet}`)

    const year = new Date().getFullYear().toString()
    const codigoOperacion = `${year[2]}${year[3]}${nanoid()}`
    localStorage.setItem('codigoOperacion', codigoOperacion)

    // Get data user

    const userMail = JSON.parse(localStorage.getItem('user')).correo
    const userID = JSON.parse(localStorage.getItem('user')).id
    const userRegister = new Date(JSON.parse(localStorage.getItem('user')).createdAt)

    const today = new Date()

    const milisegDia = 24 * 60 * 60 * 1000
    const milisegTranscurridos = Math.abs(userRegister.getTime() - today.getTime())
    const diasTranscurridos = Math.round(milisegTranscurridos / milisegDia).toString()

    const resIP = await fetch('https://api.ipify.org/?format=json')
      .then(results => results.json())
      .then(data => data)
    // console.log(resIP.ip, 'res ip')

    const tokenSession = await fetch(process.env.TOKEN_SESSION + codigoComercio, {
      method: 'POST',
      headers: headers2,
      body: JSON.stringify(
        {
          "channel": "web",
          "amount": monto.toFixed(2),
          "antifraud": {
            "clientIp": resIP.ip,
            "merchantDefineData": {
              "MDD4": userMail,
              "MDD21": 0,
              "MDD32": userID,
              "MDD75": "Registrado",
              "MDD77": diasTranscurridos
            }
          }
        }
      )
    })
      .then(res => res.json())
      .then((data) => data);
    // console.log(tokenSession.sessionKey)


    // (3) Open botón de pago: Llamar funciones API VisaNet

    VisanetCheckout.configure({
      sessiontoken: tokenSession.sessionKey,
      channel: 'web',
      merchantid: codigoComercio,
      purchasenumber: codigoOperacion,
      amount: monto.toFixed(2),
      expirationminutes: '20',
      timeouturl: 'http://localhost:8080/',
      merchantlogo: 'https://i.postimg.cc/9QxFfJqz/logoCTT.png',
      formbuttoncolor: '#000000',
      action: process.env.URI_WEB + '/detalle-compra/verify?id=' + tokenVisanet + "&cc=" + codigoComercio + "&monto=" + monto.toFixed(2) + "&codigoOperacion=" + codigoOperacion,
      complete: function (params) {
        console.log("==> " + JSON.stringify(params))
        // alert(JSON.stringify(params));
      }
    });

    // http://localhost:8080/paquetes-y-full-days/4673926-paquete-full-day-canta/comprar
    // http://localhost:8080/detalle-compra/prueba?id=235411

    VisanetCheckout.open();
    localStorage.setItem("nv", JSON.stringify(notaVenta))



  }

  useEffect(() => {

    openModalVisaNet()

  }, [])


  return (
    <>
    </>
  )
}

export default ModalPagoVisaNet
