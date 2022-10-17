<script>
    import { useNavigate } from "svelte-navigator";
    export let socket;
    export let params;
    const navigate = useNavigate();
    let userInput = "";
    let error = false;
    const { name, price } = params;
    console.log(name, price);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (Number(userInput) > Number(price)) {
            socket.emit("bidProduct", {
                price: Number(userInput),
                last_bidder: localStorage.getItem("username").toString(),
                name,
            });
            navigate("/products");
        } else {
            error = true;
        }
    };
</script>

<div class="container">
    <form on:submit={handleSubmit}>
        <div class="mb-3">
            {#if error}
                <div
                    class="alert alert-danger alert-dismissible fade show"
                    role="alert"
                >
                    The bidding amount must be greater than {price}
                </div>
            {/if}
            <label for="userInput" class="form-label">Bidding Amount:</label>
            <input
                type="text"
                class="form-control"
                name="userInput"
                bind:value={userInput}
            />
        </div>
        <button type="submit" class="btn btn-primary">Make a bid</button>
    </form>
</div>
