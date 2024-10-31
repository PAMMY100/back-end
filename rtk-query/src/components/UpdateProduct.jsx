import React from 'react'
import { useUpdateProductMutation } from '../app/service/dummyData'

const UpdateProductCom = ({productId}) => {
  const [updateProduct, {data, error, isLoading}] = useUpdateProductMutation()


  if (error) {
    return <h1>Error occured!</h1>
  }

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        title: "Title updated 😍",
      }

      await updateProduct({
        id: productId, 
      updatedProduct: updatedProductData
    })

    } catch (err) {
      console.error("An error occured while updating: ", err)
    }
  }


  return (
    <div>
      <h1>{data?.title}</h1>
      <button onClick={handleUpdateProduct} disabled={isLoading}>Update Product</button>
    </div>
  )
}

export default UpdateProductCom