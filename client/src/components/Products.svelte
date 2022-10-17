<script>
    import { useNavigate, Link } from "svelte-navigator";
    let products = [];
    const navigate = useNavigate();
    const fetchProducts = () => {
        fetch("http://localhost:4000/api")
            .then((res) => res.json())
            .then((data) => {
                products = data.products;
            });
    };

    $: fetchProducts();

    const handleBidBtn = (product) =>
        navigate(`/products/bid/${product.name}/${product.price}`);
</script>

<table class="table">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Last Bidder</th>
            <th scope="col">Creator</th>
            <th scope="col">Edit</th>
        </tr>
    </thead>
    <tbody>
        {#each products as product}
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.last_bidder}</td>
                <td>{product.owner}</td>
                <td>
                    <button
                        type="button"
                        class="btn btn-success"
                        on:click={() => handleBidBtn(product)}
                        >Edit Product</button
                    >
                </td>
            </tr>
        {/each}
    </tbody>
    <Link to="/products/add" class="btn btn-primary mt-3">Add Products</Link>
</table>
