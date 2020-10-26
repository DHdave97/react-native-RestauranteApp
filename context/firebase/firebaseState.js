import React,{useReducer} from 'react';
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'
import firebase from '../../firebase'
import _ from 'lodash'
import {OBTENER_PRODUCTOS_EXITO} from '../../types'
const FirebaseState = props =>{
    //crear state iini
    const initialState = {
        menu:[]
    }

    //usando reducer (dispatch ) para ejecutar acciones
    const [state,dispatch] = useReducer(FirebaseReducer,initialState)
    //FUNCION para traer productos
    const obtenerProductos=()=>{
       
        //consulta firebase
        firebase.db.collection('productos')
        .where('existencia','==',true)
        .onSnapshot(manejarSnapshot)
    }
    function manejarSnapshot(snapshot) {
        let platillos = snapshot.docs.map(doc=>{
          return{
            id:doc.id,
            ...doc.data()
          }
        })
        //ordenar por categoria
        platillos = _.sortBy(platillos,'categoria')
        //resultados
        dispatch({
            type:OBTENER_PRODUCTOS_EXITO,
            payload:platillos
        })
      }
    return (
        <FirebaseContext.Provider
            value={{
                menu:state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseState