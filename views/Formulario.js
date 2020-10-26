import React ,{useState,useContext,useEffect}from 'react';
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
  CardItem

} from 'native-base'
import {useNavigation} from '@react-navigation/native'
import PedidoContext from '../context/pedidos/pedidosContext'
import globalStyles from '../styles/global'
const Formulario = () => {
  const navigation = useNavigation()
  const [cantidad,guardarCantidad] = useState(1)

  const [total,guardarTotal] = useState(0)

  const {platillo,guardarPedido} = useContext(PedidoContext)
  const { precio } = platillo

  useEffect(()=>{
    calcularTotal()
  },[cantidad])

  const incrementarUno = () => { 
    const nuevaCantidad = parseInt(cantidad) + 1
    guardarCantidad(nuevaCantidad)
  }
  const decrementarUno = () => {
    if(parseInt(cantidad) <= 1) return;
    const nuevaCantidad = parseInt(cantidad) - 1
    guardarCantidad(nuevaCantidad)
  }

  const calcularTotal = ()=>{
    if(!parseInt(cantidad)) return 
    const total =  parseInt(cantidad) * parseInt(precio)
    guardarTotal(total)
  }
  const confirmarOrden = () => {
      Alert.alert(
        'Desea agregar al carrito?',
        '',
        [
          {
            text:'Confirmar',
            onPress:()=>{
              //almacenar
              const pedido = {
                ...platillo,
                cantidad,
                total
              }
              guardarPedido(pedido)
              //navegar
              navigation.navigate('Resumen')
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
    <Container >
    <Content >
      <Form>
        <Text style={globalStyles.titulo}>Cantidad</Text>
        <Grid>
          <Col>
            <Button
              props
              block
              dark
              style={{height:80,justifyContent:'center'}}
              onPress={()=>decrementarUno()}
            >
              <Icon style={{fontSize:40}} name="remove"/>
            </Button>
          </Col>
          <Col>
            <Input
            style={{textAlign:'center',fontSize:20}}
              value={cantidad.toString()}
              keyboardType="numeric"
              onChangeText={(cantidad)=>guardarCantidad(cantidad)}
            />
          </Col>
          <Col>
          <Button
              props
              block
              dark
              style={{height:80,justifyContent:'center'}}
              onPress={()=>incrementarUno()}
            >
              <Icon style={{fontSize:40}} name="add"/>
            </Button>
          </Col>
        </Grid>
        <Text style={globalStyles.cantidad}>Subtotal: $ {total}</Text>
       
      </Form>
    </Content>
    <Footer>
        <FooterTab>
          <Button style={globalStyles.boton}><Text style={globalStyles.botonTexto}
            onPress={()=>confirmarOrden()}
          >Agregar al carrito</Text></Button>
        </FooterTab>
      </Footer>
  </Container>
  )
}
const styles = StyleSheet.create({
  
});
export default Formulario