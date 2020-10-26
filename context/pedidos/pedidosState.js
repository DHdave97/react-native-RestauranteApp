import React,{useReducer} from 'react';
import PedidoReducer from './pedidosReducer'
import PedidoContext from './pedidosContext'    
import {SELECCIONAR_PRODUCTO,ELIMINAR_ARTICULO,
    CONFIRMAR_ORDENAR_PLATILLO,MOSTRAR_RESUMEN,PEDIDO_ORDENADO} from '../../types'
const PedidoState = props =>{
    //crear state iini
    const initialState = {
        pedido:[],
        platillo:null,
        total:0,
        idpedido:''
    }

    //usando reducer (dispatch ) para ejecutar acciones
    const [state,dispatch] = useReducer(PedidoReducer,initialState)

    //SELECCIONAR PRODUCTO
    const seleccionarPlatillo =platillo=>{
        dispatch({
            type:SELECCIONAR_PRODUCTO,
            payload:platillo
        })
    }

    const guardarPedido = pedido => {
        dispatch({
            type:CONFIRMAR_ORDENAR_PLATILLO,
            payload:pedido
        })
    }
    const mostrarResumen = total => {
        dispatch({
            type:MOSTRAR_RESUMEN,
            payload:total
        })
    }
    
    const eliminarArticulo = id => {
        dispatch({
            type:ELIMINAR_ARTICULO,
            payload:id
        })
    }
    
    const pedidoOrdenado = id => {
        dispatch({
            type:PEDIDO_ORDENADO,
            payload:id
        })
    }
    
    
    return (
        <PedidoContext.Provider
            value={{
                pedido:state.pedido,
                platillo:state.platillo,
                total:state.total,
                idpedido:state.idpedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarArticulo,
                pedidoOrdenado
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}
export default PedidoState