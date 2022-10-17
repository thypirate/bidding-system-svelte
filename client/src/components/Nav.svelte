<script>
    import { Link } from "svelte-navigator";
    export let socket;

    $: {
        socket.on("addResponse", (data) => {
            alert("New product added.");
        });
        socket.on("bidResponse", (data) => {
            alert("New bidd.");
        });
    }
</script>

<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Bidding system</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <Link to="/home" class="nav-link">Home</Link>
                </li>
                <li class="nav-item">
                    <Link to="/products" class="nav-link">Products</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
