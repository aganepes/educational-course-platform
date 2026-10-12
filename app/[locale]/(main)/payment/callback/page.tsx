// Status 2 bolsa -> Success sahypasyna redirect
if (parsedStatus.success && parsedStatus.data.orderStatus === 2) {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${bankOrderId}`);
} 

// Status 2 bolmasa (Nätanyş ýa-da ýalňyşlyk) -> Failed sahypasyna redirect
return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/failed`);