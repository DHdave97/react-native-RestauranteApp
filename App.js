import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

//pages
import DetallePlatillo from './views/DetallePlatillo'
import Formulario from './views/Formulario'
import Menu from './views/Menu'
import Orden from './views/Orden'
import Progreso from './views/Progreso'
import Resumen from './views/Resumen'
//components
import BotonResumen from './components/ui/BotonResumen'

import FirebaseState from './context/firebase/firebaseState'
import PedidoState from './context/pedidos/pedidosState'
const App = () => {
  return (
    <>
      <FirebaseState>
<PedidoState>

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Orden"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFDA00'
              },
              headerTitleStyle: {
                fontWeight: 'bold'
              },
              headerTintColor:'#000'
            }}
          >
            <Stack.Screen
              name="Detalle"
              component={DetallePlatillo}
              options={{
                title: 'Detalle del Platillo'
              }}
            />
            <Stack.Screen
              name="Formulario"
              component={Formulario}
              options={{
                title: 'Ordenar Platillo'
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title: 'Menu del dia',
                headerRight:props=><BotonResumen/>
              }}
            />
            <Stack.Screen
              name="Orden"
              component={Orden}
              options={{
                title: 'Nueva Orden'
              }}
            />
            <Stack.Screen
              name="Progreso"
              component={Progreso}
              options={{
                title: 'Progreso del Pedido'
              }}
            />
            <Stack.Screen
              name="Resumen"
              component={Resumen}
              options={{
                title: 'Resumen del Pedido'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
