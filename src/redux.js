
import { createStore, combineReducers } from "redux"

const initialData = {
    products: [],
    cart: [],//[ {}, {}, {} ], 
}

export function increaseQuantity()
{
    return{
        type: "INCREASE_QUANTITY"
    }
}

export function addToCart(data)
{
    
    return{
        type: "ADD_TO_CART",
       
        payload: data// {......}
       
    }
}


export function addProducts(info)//info = [ {}, {}, {},....]
{
    return{
        type: "ADD_PRODUCTS",
        payload: info
    }
}

function productReducer(state = initialData, action)
{
    
    if(action.type == "ADD_PRODUCTS")
    {
        
        // Logic to add the products to redux store
        return{
            products: action.payload,
            cart: state.cart
        }
    }

    if(action.type == "ADD_TO_CART")

    
    {
        //Logic the logic to add that product to cart []
        // action.payload --> current item {.......}
        // [ {}, {} ] --> {}
        
      
        let pushItem=false;
        
        if(state.cart.length == 0)
        {
           
            pushItem = true;
        }

        else if(state.cart.length > 0)
        {
                pushItem=true;

                let newCart = state.cart.map((i, j)=>
                {
                    if(i.title === action.payload.title)
                    {
                        pushItem = false;

                        // same item we should increase quantity 
                        i = { ...i, quantity: i.quantity + 1}
                        i = {...i,final: i.price * i.quantity}   
                        
                    }
           
                    return i //{}
                })

                if(!pushItem)
                {
                    return {
                        products:state.products,
                        cart: newCart
                    }
                }
                
        }

        // [{}, {}, {}]
        
        if(pushItem)
        {
            // action.payload = {}//NO QUANTITY KEY

        

            action.payload.quantity = 1
            action.payload.final = 1

            

            // console.log("my quantity increased")

            // {.., ..., ... ,quantity: 1}

            return {
                
                products:state.products,
                cart: [...state.cart, action.payload],
            }
        }
      
        // {
            // products:[{}, {}, {}],

            // cart: [{title: "Shoe", price: 500}],

            // quantity: 1
        // }
                    
        
    // }
    }
    return state
}

const rootReducer = combineReducers({
    product: productReducer    
})


export const productStore = createStore(rootReducer)
