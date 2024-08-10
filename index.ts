type Pizza = {
  id: number,
  name: string,
  price: number
}

type Order = {
  id: number,
  pizza: Pizza,
  status: "ordered" | "completed"
}

let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId = 1;

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Margherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 10 },
  { id: nextPizzaId++, name: "Veggie", price: 9 },
];

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
    id: nextPizzaId++,
    ...pizzaObj
  }
  menu.push(newPizza);
  return newPizza;
}

function placeOrder(order: string): Order | void {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === order);
  if (!selectedPizza) {
    console.error(`${order} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered"
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order {
  const order = orderQueue.find(order => order.id === orderId)
  if (!order) {
    throw new Error(`${orderId} was not found in the orderQueue`);
  }
  order.status = "completed";
  return order;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "string") {
    return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase());
  } else if (typeof identifier === "number") {
    return menu.find(pizza => pizza.id === identifier);
  } else {
    throw new Error("Invalid type of identifier.");
  }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
