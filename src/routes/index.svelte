<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";


export const prerender = true;
export const load: Load = async ({fetch})=> {
    let data = {}
    const res = await fetch("/song");
    data = await res.json();
    return {
        props: {
            data
        }
    }
}
let newSong: string;
const sendIt = async () => {
    const res = await fetch("/song", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({newSong:newSong})
    });
    return await res.json();
}

</script>
<script lang="ts">
    export let data: any;
</script>
<h1>Kul musikk</h1>
<p>Here is some kul musikk:</p>
<iframe title="Hello" style="border-radius:12px" src={`https://open.spotify.com/embed/track/${data.spotifySongId}?utm_source=generator`} width="100%" height="380" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
<h2>Add kul musikk</h2>
<input type="text" placeholder="Spotify link" bind:value={newSong}>
<button on:click={sendIt}>Send it!</button>