import React from 'react'
import DeleteProduct from './components/DeleteProduct';
// import AllProducts from './components/AllProducts';
// import SpecificProduct from './components/SpecificProduct';
// import AddNewProduct from './components/AddNewProduct';
// import UpdateProductCom from './components/UpdateProduct';

const App = () => {

  return (
    <div>
      {/* <AllProducts /> */}
      {/* <SpecificProduct /> */}
      {/* <AddNewProduct /> */}
      {/* <UpdateProductCom productId={2}/> */}
      <DeleteProduct productId={2} />
    </div>
  )
}

export default App;
