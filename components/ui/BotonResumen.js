import React ,{useContext}from 'react';
import {Button,Text} from 'native-base'
import globalStyles from '../../styles/global'
import {useNavigation} from '@react-navigation/native'
import PedidoContext from '../../context/pedidos/pedidosContext'
const BotonResumen = (params) => {
    const navigation = useNavigation()
    const {pedido} = useContext(PedidoContext)
    if(pedido.length === 0) return null
  return(
    <Button style={globalStyles.boton}
        onPress={()=>navigation.navigate('Resumen')}
    ><Text style={globalStyles.botonTexto}>Carrito</Text></Button>
  )
}
export default BotonResumen