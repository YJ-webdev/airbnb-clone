import Head from "next/head";

export default function ListingIdPage({ listingId }: { listingId: string }) {
  return (
    <>
      <Head>
        <title>Experience Unforgettable on your stay!</title>
        <meta name="description" content="Check out this awesome place" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://example.com/og-image.png" />
        <meta property="og:title" content="ListingIdPage" />
        <meta property="og:description" content="Check out this listing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:title" content="ListingIdPage" />
        <meta name="twitter:description" content="Check out this listing" />
        <meta name="twitter:image" content="https://example.com/og-image.png" />
        <meta
          name="twitter:url"
          content="http://localhost:3000/listing/${listingId}"
        />
      </Head>
    </>
  );
}
