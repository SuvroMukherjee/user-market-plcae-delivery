export  function ProductPayloadFromTempCart(allProducts){
   let newData = allProducts?.map((ele)=>{
      return { proId: ele?.proId?._id, quantity: ele?.quantity };
   })

  return newData
}