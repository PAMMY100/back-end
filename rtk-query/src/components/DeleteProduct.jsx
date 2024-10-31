import React from 'react'
import { useDeleteProductMutation } from '../app/service/dummyData'


const DeleteProduct = ({productId}) => {
  const [deleteProduct, {data, error, isLoading}] = useDeleteProductMutation();

  if (error) {
    return <h1>An error Ocurred!</h1>
  }

  if (isLoading ) {
    return <h1>Loading...</h1>
  }

  const handleDeleteProduct = async () => {

    try {
      
      await deleteProduct(productId)
    } catch (err) {
      console.error("an error occured: ", err)
    }
  }


  return (
    <div>
      <h1>{data?.title}</h1>
      {data && <p>Item deleted successfuly</p>}
      <button onClick={handleDeleteProduct} disabled={isLoading}>Delete Product</button>
    </div>
  )
}

export default DeleteProduct