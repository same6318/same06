const products = [
  {
    id: 1,
    name: "オリジナルブレンド200g",
    price: 500,
  },
  {
    id: 2,
    name: "オリジナルブレンド500g",
    price: 900,
  },
  {
    id: 3,
    name: "スペシャルブレンド200g",
    price: 700,
  },
  {
    id: 4,
    name: "オリジナルブレンド200g",
    price: 1200,
  }
]

const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const targetId  = parseInt(priceElement.value);//商品のid1~4を定義。
  const product = products.find(item => item.id == targetId);//products配列の中から、追加ボタンを押した時に取得したtagetIDと配列idと同じものをproductに代入。
  const number = numberElement.value;
  //console.log(product);

  let purchase = {
    product: product,
    number: parseInt(number),
  };
  //console.log(purchase);//ここでproductsのオブジェクトが見える状態。id、商品名、金額。

  const newPurchase = purchases.findIndex((item) => item.product.id === purchase.product.id)//findIndexは条件を満たさない場合[-1]を返す関数。purchase.product.idはすでに追加済みの商品の中が比較対象。
  //console.log(newPurchase);

  if(purchases.length < 1 || newPurchase === -1) {
    purchases.push(purchase)
  } else {
    purchases[newPurchase].number += purchase.number 
    //purchases.number += purchase.number //こっちでは同じアイテムの数量を足せない。
  }

  window.alert(`${display()}\n小計${subtotal()}円`);
  priceElement.value = "";
  numberElement.value = "";
}

function subtotal() {
  return purchases.reduce((prev, purchase) => { //prevには何も入ってない。初期値はpurchaseの状態をreduceに入れ込む。
    //console.log(prev);
    //console.log("TEST");
    //console.log(purchase);
    //console.log("TEST");
    return prev + purchase.product.price * purchase.number; //初期値prevは0で、purchaseの中のproductの中のprice * purchase.numberでかける。
  }, 0)
}

function display() {
  return purchases.map(purchase => {
    return `${purchase.product.name} ${purchase.product.price}円:${purchase.number}点\n`;
  }).join("");
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0
  } else if (sum < 2000){
    return 500
  } else {
    return 250
  }
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${display()}\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}
