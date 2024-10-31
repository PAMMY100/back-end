import React from 'react'
import { useAddNewProductMutation } from '../app/service/dummyData'

const AddNewProduct = () => {
  const [AddNewProduct, {error, isLoading, data}] = useAddNewProductMutation()

  if (error) {
    return <h1>Error</h1>
  }

  if(isLoading) { 
    return <h1>Loading...</h1>
  }

  const handleAddProduct = async () => { 
    try {
      const newProductData = {
        id: 1,
        title: "Amazing T-shirt",
        description: "This is one of the best and amazing t-shirt in the market."
      }

      await AddNewProduct(newProductData);

    } catch (err) { 
      console.error("Error adding new product:", err);
    }
  }

  return (
    <div>
      <h1>{data?.id}</h1>
      <h3>{data?.title}</h3>
      <p>{data?.description}</p>
      <button onClick={handleAddProduct} disabled={isLoading}>Add New Product</button>
    </div>
  )
}

export default AddNewProduct