import React,{useContext,useEffect} from 'react';
import {StyleSheet,Alert} from 'react-native'
import {
  Container,
  Content,
  Form,
  Input,
  Icon,
  Footer,
  FooterTab,
  Grid,
  Col,
  Button,
  Body,
  Text,
  H1,
  Card,
  CardItem,
  List,
  ListItem,
  Thumbnail,
  Left
} from 'native-base'
import {useNavigation} from '@react-navigation/native'
import PedidoContext from '../context/pedidos/pedidosContext'
import globalStyles from '../styles/global'
import firebase from '../firebase'
import firebaseConfig from '../firebase/config';
const Resumen = () => {
  const navigation=useNavigation()
  const {pedido,total,mostrarResumen,eliminarArticulo,pedidoOrdenado} = useContext(PedidoContext)

  useEffect(()=>{
    calcularTotal()
  },[pedido])
  const calcularTotal = (params) => {
    let nuevoTotal = 0
    nuevoTotal = pedido.reduce((nuevoTotal,articulo)=> nuevoTotal + articulo.total,0)
    mostrarResumen(nuevoTotal)
  }
  const confirmarPedido = () => {
    Alert.alert(
      'Desea confirmar su pedido?',
      'Un pedido confirmado no se podra cancelar.',
      [
        {
          text:'Confirmar',
          onPress:async()=>{
            //creae obj pedido
            const pedidoObj={
              tiempoentrega:0,
              completado:false,
              total:Number(total),
              orden:pedido,
              creado:Date.now()
            }

            //escribir en firebase 
            try {
                const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
                pedidoOrdenado(pedido.id)
            } catch (error) {
                console.log(error)
            }
            //navegar
            navigation.navigate('Progreso')
          },
         
        },
        {
          text:'Cancelar',
          style:'cancel'
        }
      ]
    )
}
const confirmarEliminar = id => {
  Alert.alert(
    'Desea eliminar el articulo?',
    '',
    [
      {
        text:'Confirmar',
        onPress:()=>{
          //eliminar
          eliminarArticulo(id)
        },
       
      },
      {
        text:'Cancelar',
        style:'cancel'
      }
    ]
  )
}

  return(
      <Container style={globalStyles.contenedor}>
        <Content style={globalStyles.contenido}>
          <H1 style={globalStyles.titulo}>Resumen del Pedido</H1>
          {pedido.map((platillo,i)=>{
            const {cantidad,nombre,imagen,id,precio,cantegoria} = platillo
            return(
              <List key ={id + i}>
                <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri:imagen}}/>
                </Left>
                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <Text>Precio: $ {precio}</Text>
                  <Button
                  onPress={()=>confirmarEliminar(id)}
                    full
                    danger
                    style={{marginTop:20}}
                  >
                    <Text style={[globalStyles.botonTexto,{color:'#fff'}]}>Eliminar</Text>
                  </Button>
                </Body>
                </ListItem>
              </List>
            )
          })}
          <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>
          <Button
          style={[{marginTop:30}]}
            block
            dark
            onPress={()=>navigation.navigate('Menu')}
          ><Text style={[globalStyles.botonTexto,{color:'#fff'}]}>Seguir ordenando</Text></Button>
        </Content>
    <Footer>
        <FooterTab>
        <Button
          style={[globalStyles.boton,{marginTop:30}]}
            block
            onPress={()=>confirmarPedido()}
          ><Text style={globalStyles.botonTexto}>Ordenar Pedido</Text></Button>
        </FooterTab>
      </Footer>
      </Container>
  )
}
export default Resumen