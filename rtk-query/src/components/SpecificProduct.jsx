import React from 'react'
import { useGetProductByIdQuery } from '../app/service/dummyData'

const SpecificProduct = () => {
  const {data, isError, isLoading} = useGetProductByIdQuery(5)

  if(isError) { 
    return <h1>An error occured</h1>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1>{data?.brand}</h1>
      <h2>{data?.category}</h2>
      <h3>{data?.description}</h3>
    </div>
  )
}

export default SpecificProduct