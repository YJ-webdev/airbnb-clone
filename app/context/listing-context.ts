// import { useReducer, useContext, createContext } from 'react';

// export interface ProductState {
//     favoriteIds: string[];
//   }

//   export type ProductAction =
//     | { type: 'TOGGLE_FAVORITE'; payload: string };

//   export interface ProductContextType {
//     state: ProductState;
//     dispatch: React.Dispatch<ProductAction>;
//   }

// const ProductContext = createContext( );

// const productReducer = (state: ProductState, action  : ProductAction) => {
//   switch (action.type) {
//     case 'TOGGLE_FAVORITE':
//       const listingId = action.payload;
//       return {
//         ...state,
//         favoriteIds: state.favoriteIds.includes(listingId)
//           ? state.favoriteIds.filter((id) => id !== listingId)
//           : [...state.favoriteIds, listingId]
//       };
//     default:
//       return state;
//   }
// };

// export const ProductProvider = ({ children }:{children: React.ReactNode}) => {
//   const [state, dispatch] = useReducer(productReducer, { favoriteIds: [] });

//   return (
//     <ProductContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProductContext = () => useContext(ProductContext);
