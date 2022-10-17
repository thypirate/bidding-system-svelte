<script>
    export let socket;
    import { useNavigate, Link } from "svelte-navigator";
    let name = "";
    let price = 0;
    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        socket.emit("addProduct", {
            name,
            price,
            owner: localStorage.getItem("username").toString(),
        });
        navigate("/products");
    };
</script>

<div class="container">
    <form on:submit={handleSubmit}>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input
                type="text"
                class="form-control"
                name="name"
                bind:value={name}
            />
        </div>
        <div class="mb-3">
            <label for="pric" class="form-label">Price:</label>
            <input
                type="text"
                class="form-control"
                name="price"
                bind:value={price}
            />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
