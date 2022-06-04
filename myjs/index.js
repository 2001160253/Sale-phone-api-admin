// import { Product } from "../myjs/product";

class Product {
  constructor(
    name,
    price,
    screen,
    bCamera,
    fCamera,
    img,
    desc,
    quantity,
    type
  ) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = bCamera;
    this.frontCamera = fCamera;
    this.img = img;
    this.desc = desc;
    this.quantity = quantity;
    this.type = type;
  }
}

let productList = [];
function resetForm(){
  document.getElementById("formProduct").reset()
}

const renderProduct = (data) => {
  data = data || productList;

  let dataHTML = "";
  data.forEach((item) => {
    dataHTML += `
        <tr>
        <td class="td-name">${item.name}</td>
        <td>${item.price}</td>
        <td>${item.screen}</td>
        <td class="td-name">${item.backCamera}</td>
        <td>${item.frontCamera}</td>
        <td><img style="width:100px" src="${item.img}" alt="${item.name}" /></td>
        <td class="td-desc">${item.desc}</td>
        <td>${item.quantity}</td>
        <td>${item.type}</td>
   
        <td><button class="btnDelete btn btn-danger btn-sm">Xóa</button>
        <button class="btnUpdate btn btn-info btn-sm">Cập nhật</button></td>
        
      </tr>
        `;
  });

  document.getElementById("tableDanhSach").innerHTML = dataHTML;
  const delProduct = document.querySelectorAll(".btnDelete");
  const upProduct = document.querySelectorAll(".btnUpdate");
  data.forEach((item, index) => {
    delProduct[index].addEventListener("click", () => {
      deleteProduct(item.id);
    });
    upProduct[index].addEventListener("click", () => {
      getProduct(item.id);
      document.getElementById("btnSuaSP").style.display="block";
     document.getElementById( "btnThemSP").style.display="none"
    });
  });
};

const fetchData = async () => {
  try {
    const res = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });
    productList = res.data.map((item) => item);
    renderProduct();

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
fetchData();

//search
const findProduct = () => {
  const keyword = document.querySelector("#searchName").value.trim();
  const results = [];
  productList.forEach((item) => {
    const productName = item.name.toLowerCase();
    if (item.name === keyword || productName.includes(keyword)) {
      results.push(item);
    }
  });

  renderProduct(results);
};

const btnSearch = document.querySelector("#btnTimSP");
btnSearch.addEventListener("click", () => {
  findProduct();
});

//create
const createProduct = () => {
  const name = document.getElementById("i-name").value;
  const price = document.getElementById("i-price").value;
  const screen = document.getElementById("i-screen").value;
  const bcam = document.getElementById("i-bcame").value;
  const fcam = document.getElementById("i-fcame").value;
  const img = document.getElementById("i-img").value;
  const desc = document.getElementById("i-desc").value;
  const quantity = document.getElementById("i-quantity").value;
  const type = document.getElementById("i-type").value;
  const newProduct = new Product(
    name,
    price,
    screen,
    screen,
    bcam,
    fcam,
    img,
    desc,
    quantity,
    type
  );
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "POST",
    data: newProduct,
  })
    .then((res) => {
      fetchData();
      resetForm()
    })
    .catch((err) => {
      console.log(err);
    });
};

const addProduct = document.getElementById("btnThemSP");
addProduct.addEventListener("click", () => {
  createProduct();
});

//delete
const deleteProduct = (id) => {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
    method: "DELETE",
  })
    .then((res) => {
      console.log("da xoas");
      fetchData();
    })
    .catch((err) => {
      console.log(err);
    });
};
//update
const updateProduct = (id) => {
  const name = document.getElementById("i-name").value;
  const price = document.getElementById("i-price").value;
  const screen = document.getElementById("i-screen").value;
  const bcam = document.getElementById("i-bcame").value;
  const fcam = document.getElementById("i-fcame").value;
  const img = document.getElementById("i-img").value;
  const desc = document.getElementById("i-desc").value;
  const quantity = document.getElementById("i-quantity").value;
  const type = document.getElementById("i-type").value;
  const updateProduct = new Product(
    name,
    price,
    screen,
    screen,
    bcam,
    fcam,
    img,
    desc,
    quantity,
    type
  );
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
    method: "PUT",
    data: updateProduct,
  })
    .then((res) => {
      fetchData();
      resetForm()
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = (id) => {
  axios({
    url: " https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
    method: "GET",
  })
    .then((res) => {
      const product = res.data;
      document.getElementById("i-name").value = product.name;
      document.getElementById("i-price").value = product.price;
      document.getElementById("i-screen").value = product.screen;
      document.getElementById("i-bcame").value = product.backCamera;
      document.getElementById("i-fcame").value = product.frontCamera;
      document.getElementById("i-img").value = product.img;
      document.getElementById("i-desc").value = product.desc;
      document.getElementById("i-quantity").value = product.quantity;
      document.getElementById("i-type").value = product.type;

      document.getElementById("btnSuaSP").addEventListener("click", () => {
        updateProduct(id);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
