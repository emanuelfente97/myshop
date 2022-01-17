// Part 4: Sorting the array alphabetically

// CREATE, READ, UPDATE, DELETE
var itemList = document.getElementById("items");
let items = [
  {
    name: "Long-life milk",
    category: "Dairy",
    price: "R45",
  },
  {
    name: "Beef",
    category: "Dairy",
    price: "R100",
  },
  {
    name: "Spinach",
    category: "Veg",
    price: "R12",
  },
  {
    name: "Banana",
    category: "Fruit",
    price: "R6",
  },
];

// Counter: Number of countries in the array
countitems = (data) => {
  var count = document.getElementById("counter");
  if (data) {
    count.innerHTML = "There are a total of " + data + " items";
    // Show the heading text for the table
    document.getElementById("name").style.display = "block";
  } else {
    count.innerHTML = "No item";
    // Hide the heading text for the table
    document.getElementById("name").style.display = "none";
    document.getElementById("category").style.display = "none";
    document.getElementById("price").style.display = "none";
  }
};
// Read: GET
getitems= () => {
  var data = "";
  if (items.length > 0) {
    for (i = 0; i < items.length; i++) {
      data += "<tr>";
      data += '<td>' + [i+1]+ '</td>';
      data += "<td>" + items[i].name + "</td>";
      data += "<td>" + items[i].category + "</td>";
      data += "<td>" + items[i].price + "</td>";
      data += '<td><button onclick="edititem(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deleteitem(' + i + ')">Delete</button></td>';
      data += "</tr>";
    }
  }
  countitems(items.length);
  return (itemList.innerHTML = data);
};
// Create: POST
additem = () => {
  try {
    var itemAdded = document.getElementById("add-item").value.trim();
    var categoryAdded = document.getElementById("add-category").value.trim();
    var priceAdded = document.getElementById("add-price").value.trim();
    if (!itemAdded || !categoryAdded || !priceAdded) {
      throw new Error(
        "You have not inserted a value in one of the input fields"
      );
    }
    // Get the value
    var itemDetails = {
      name: itemAdded,
      category: categoryAdded,
      price: priceAdded,
    };
    if (itemDetails) {
      // addCountry the new value
      items.push(itemDetails);
      // Reset input value
      itemAdded.value = "";
      // Dislay the new list
      getitems();
    }
  } catch (err) {
    alert(err.message);
  }
};
// Update: PUT
edititem = (product) => {
  var edititem = document.getElementById("edit-item");
  var editcategory = document.getElementById("edit-category");
  var editprice = document.getElementById("edit-price");
  // Display value in the field
  edititem.value = items[product].name;
  editcategory.value = items[product].category;
  editprice.value = items[product].price;

  // Display fields
  document.getElementById("editForm").style.display = "block";
  // When the form is submitted
  document.getElementById("saveEdit").onsubmit = () => {
    try {
      console.log(edititem.value.trim());
      if (
        !edititem.value.trim() ||
        !editcategory.value.trim() ||
        !editprice.value.trim()
      ) {
        throw new Error(
          "You have not inserted a value in one of the input fields"
        );
      }
      // Get value
      var itemDetails = {
        name: edititem.value,
        category: editcategory.value,
        price: editprice.value,
      };

      if (itemDetails) {
        // editCountry value
        items.splice(product, 1, itemDetails);
        // Display the new list
        getitems();
        // Hide fields
        closeInput();
      }
    } catch (err) {
      alert(err.message);
    }
  };
};
// Delete: Delete
deleteitem = (product) => {
  // deleteCountry the current row
  items.splice(product, 1);
  // Display the new list
  getitems();
};
// Search: Country Search
searchbar = () => {
  var searcheditem = document.getElementById("search").value.trim();
  try {
    if (!searcheditem) {
      throw new Error("Nothing was entered in the search bar");
    }
    // Filter all the countries in the array with value typed into the input field
    let itemsFound = items.filter((item) =>
      item.name.toLowerCase().includes(searcheditem.toLowerCase())
    );
    if (itemsFound.length === 0) {
      throw new Error("No items were found");
    }
    items = itemsFound;
    getitems();
  } catch (err) {
    alert(err.message);
  }
};

// Sort: Sort countries alphabetically
sortitems = () => {
  // Sorting alphabetically in decending order
  items.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  getitems();
};

// Sort: Sort continents alphabetically
sortcategory = () => {
  // Sorting alphabetically in decending order
  items.sort((a, b) => {
    let fa = a.category.toLowerCase(),
      fb = b.category.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  getitems();
};

// Where the script starts. This executes when the file loads on the browser
getitems();

// Close Edit form
closeInput = () => {
  document.getElementById("editForm").style.display = "none";
};
