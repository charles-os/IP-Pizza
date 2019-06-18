// var counter = 0;

// function Pizza(size, name) {
//     this.size = size;
//     this.price = 600;
//     this.name = name;
// }


// Pizza.prototype.calcCost = function () {
    
    
//     if (this.size === "1") {
//         this.price += 0
//     } else if (this.size === "2") {
//         this.price += 200
//     } else if (this.size === "3") {
//         this.price += 400
//     }
//     return this.price;
// }
// var nameGen = function (size) {
//     if (size === "1") {
//         return "small"
//     } else if (size === "2") {
//         return "medium"
//     } else if (size === "3") {fun
//         return "large"
//     } 
// }

function PizzaOrder(quantity, pizzaSize, pizzaName, toppings, toppingsPrice, price) {
    this.quantity = quantity;
    this.pizzaSize = pizzaSize;
    this.pizzaName = pizzaName;
    this.toppings = toppings;
    this.toppingsPrice = [];
    this.price = price;
  };
  
  PizzaOrder.prototype.calculatePrice = function() {
  
    var specialToppings = ["Extra Cheese", "Extra Sauce", "Garlic", "Roasted Peppers", "Pepperoni", "Sausage", "Spinach", "Pineapple", "Canadian Bacon", "Bacon", "Onions", "Mushrooms"];
    var medprice = 700;
  
    for (var i = 0; i < this.toppings.length; i++) {
      for (var j = 0; j < specialToppings.length; j++){
        if(this.toppings[i] === specialToppings[j]) {
        this.toppingsPrice.push(50);
        medprice += 50;
        }
      }
    }
    if (this.pizzaSize === "Small") {
      medprice -= 100;
    }
    if (this.pizzaSize === "Large") {
      medprice += 100;
    }
    if (this.pizzaSize === "XL") {
      medprice += 300;
    }
    return medprice;
  };
  
  PizzaOrder.prototype.orderSummary = function() {
    return this.pizzaSize + " " + this.pizzaName;
  };
  
  
  $(document).ready(function() {
    $("form#new-order").submit(function(event) {
      event.preventDefault();
  
      var inputtedQuantity = $("input#inputtedQuantity").val();
      var inputtedSize = $("select#inputtedSize").val();
      var inputtedName = $("input#inputtedName").val();
  
      var inputtedToppings = [];
        $.each($('input[name="topping"]:checked'), function() {
          inputtedToppings.push($(this).val());
        });
  
      var newPizzaOrder = new PizzaOrder (inputtedQuantity, inputtedSize, inputtedName, inputtedToppings);
      var price = newPizzaOrder.calculatePrice();
      var roundedPrice = price.toFixed(2);
  
      if (inputtedSize === "" || inputtedName === "" || inputtedToppings === 0) {
        alert("Please make sure all fields are marked/filled!");
      }
      else {
  
        $(".orderList").show();
        $("ul#orders").append("<span class='order'><li>" + newPizzaOrder.orderSummary() + "</li></span>");
  
        $("input#inputtedQuantity").val("");
        $("select#inputtedSize").val("");
        $('input:checkbox').removeAttr('checked');
        $("input#inputtedName").val("");
      };
  
      $(".order").last().click(function() {
        $("#show-order").show();
        $("#toppings").empty();
        $("#show-order h4").text(newPizzaOrder.orderSummary());
        $(".price").text("Kshs" + roundedPrice);
  
        for (var i = 0; i < inputtedToppings.length; i++) {
          $("ul#toppings").append("<li>" + inputtedToppings[i] + "</li>");
        };
      });
    });
    $(document).on('click', '#placeOrder', function() {
      $("#modal").modal('show');
    });
  });
  












