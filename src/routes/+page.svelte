<script>
// @ts-nocheck

	import {
		Button,
		Rating,
		Spinner,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch
	} from 'flowbite-svelte';
	import { FaceFrown, ArrowPathRoundedSquare} from "svelte-heros-v2";
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';

	$: enheter = [];
	$: loading = true

    let searchTerm = '';
    $: filteredEnheter = enheter.filter(
      (enhet) => enhet.navn.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

	onMount(async () => {
		getEnheter()
	});

	async function getEnheter() {
		loading = true;
		fetch('https://data.brreg.no/enhetsregisteret/api/enheter?size=1000')
			.then((response) => response.json())
			.then((response) => {
				enheter = response._embedded.enheter.map((enhet) => ({
					...enhet,
					rating: 0 // default rating value
				}));
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

		Velkommen til bedriftoversikten!
	</h1>
	<Button on:click={getEnheter} class="mt-5">
		Refresh
	</Button>

	<Table class="mt-10"/>
	{#if loading}
		<Spinner color="red"/>
	{:else}
	{console.log(enheter)}

		<TableSearch placeholder="Søk etter navn på bedriften" hoverable={true} bind:inputValue={searchTerm}>
			<TableHead>
				<TableHeadCell>organisasjonsnummer</TableHeadCell>
				<TableHeadCell>navn</TableHeadCell>
				<TableHeadCell>organisasjonsform</TableHeadCell>
				<TableHeadCell>Hvor dårlig er denne bedriften?</TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each filteredEnheter as enhet}
				<TableBodyRow>
					<TableBodyCell>{enhet.organisasjonsnummer}</TableBodyCell>
					<TableBodyCell>{enhet.navn}</TableBodyCell>
					<TableBodyCell>({enhet.organisasjonsform.kode}) {enhet.organisasjonsform.beskrivelse}</TableBodyCell>
					<TableBodyCell>
					<Rating total={5} rating={enhet.rating}>
						<p slot="text" class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{enhet.rating}/5</p>
						<span slot="ratingUp">
							<FaceFrown class="w-6 h-6 text-red-500 dark:text-red-700"></FaceFrown>
						</span>
						<span slot="ratingDown">
							<FaceFrown class="w-6 h-6 text-gray-300 dark:text-gray-500"></FaceFrown>
						</span>
					</Rating>
				</TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
		</TableSearch>
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
