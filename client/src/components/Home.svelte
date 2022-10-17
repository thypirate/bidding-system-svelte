<script>
    import { Router, Route, Link, useNavigate } from "svelte-navigator";
    let username = "";
    const navigate = useNavigate();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        localStorage.setItem("username", username);
        navigate("/products");
    };
</script>

<div class="container">
    <form on:submit={handleSubmit}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input type="text" class="form-control" bind:value={username} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
