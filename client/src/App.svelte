<script>
  import { Router, Route } from "svelte-navigator";
  import Home from "./components/Home.svelte";
  import Nav from "./components/Nav.svelte";
  import Products from "./components/Products.svelte";
  import AddProduct from "./components/AddProduct.svelte";
  import BidProduct from "./components/BidProduct.svelte";
  import io from "socket.io-client";
  const socket = io("http://localhost:4000", {
    transports: ["websocket"],
  });
</script>

<Router>
  <Nav {socket} />
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <Route path="/home" component={Home} />
    <Route path="/products" component={Products} />
    <Route path="/products/add"><AddProduct {socket} /></Route>
    <Route path="/products/bid/:name/:price" let:params
      ><BidProduct {params} {socket} /></Route
    >
  </div>
</Router>
