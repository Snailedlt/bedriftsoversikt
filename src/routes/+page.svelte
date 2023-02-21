<script>
	import { Rating, Spinner } from 'flowbite-svelte';
	import { FaceFrown } from "svelte-heros-v2";
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';
	
	/**
	 * @type {any}
	 */
	$: enheter = [];
	$: loading = true
	$: rating = 1

	onMount(async () => {
		getEnheter()
	});

	async function getEnheter() {
		loading = true;
		fetch('https://data.brreg.no/enhetsregisteret/api/enheter?size=1000')
			.then((response) => response.json())
			.then((response) => {
				enheter = response._embedded.enheter;
			})
			.then(() => loading = false)
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>
	<button on:click={getEnheter}>Refresh</button>
	{#if loading}
		<Spinner color="red"/>
	{:else}
		<table>
			<tr>
				<th>organisasjonsnummer</th>
				<th>navn</th>
				<th>organisasjonsform</th>
				<th>
					Hvor dårlig er denne bedriften?
				</th>
			</tr>
			{#each enheter as enhet, i}
			<tr>
				<td>{enhet.organisasjonsnummer}</td>
				<td>{enhet.navn}</td>
				<td>({enhet.organisasjonsform.kode}) {enhet.organisasjonsform.beskrivelse}</td>
				<td>
					<Rating total={5} rating={rating}>
						<p slot="text" class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{rating}/5</p>
						<span slot="ratingUp">
							<FaceFrown class="w-6 h-6 text-red-500 dark:text-red-700"></FaceFrown>
						</span>
						<span slot="ratingDown">
							<FaceFrown class="w-6 h-6 text-gray-300 dark:text-gray-500"></FaceFrown>
						</span>
					</Rating>
				</td>
			</tr>
			{/each}
		</table>
	{/if}

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
	}

	td, th {
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
	}

	tr:nth-child(even) {
	background-color: #dddddd;
	}
</style>
