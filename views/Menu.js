import React, { useEffect, useContext, Fragment } from 'react';
import {useNavigation} from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import {
  Container, Separator, Content,
  List, ListItem, Thumbnail,
  Text, Left, Body
} from 'native-base'
import globalStyles from '../styles/global'
import FirebaseContext from '../context/firebase/firebaseContext'
import PedidoContext from '../context/pedidos/pedidosContext'

const Menu = () => {
  //CONTEXT FIRBASE
  const { menu, obtenerProductos } = useContext(FirebaseContext)

  //context de pedido
  const { seleccionarPlatillo } = useContext(PedidoContext)

  //redireccion
  const navigation = useNavigation()
  useEffect(() => {
    obtenerProductos()
  }, [])
  const mostrarHeading = (categoria, i) => {

    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria.toUpperCase()}</Text>
          </Separator>
        )
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria.toUpperCase()}</Text>
        </Separator>
      )
    }

  }
  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{ backgroundColor: '#FFF' }}>
        <List>
          {menu.map((platillo, i) => {
            const { imagen, nombre, descripcion, categoria, id, precio } = platillo
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={() => {
                    //eliminar propiedades del platillo
                    //const {existencia,...platillo2}=platillo
                    seleccionarPlatillo(platillo);
                    navigation.navigate('Detalle')
                  }}
                >
                  <Thumbnail
                    large square
                    source={{ uri: imagen }}
                  />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text
                      note
                      numberOfLines={3}
                    >{descripcion}</Text>
                    <Text>Precio: $ {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            )
          })}
        </List>

      </Content>

    </Container>
  )
}
const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000'
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold'
  }
});
export default Menu