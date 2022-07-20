import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

import React from 'react';

export const Navbar = () => {
  //   console.log(
  //     useSelector((store) => {
  //       console.log(store); //gives an object which have values of store means items we have in reducer object, right now we have cart state in that object with values cartItems, amount, total,isLoading
  //     })
  //   );
  const { amount } = useSelector((store) => store.cart);
  return (
    <nav>
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
