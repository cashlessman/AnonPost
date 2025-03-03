export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjI2ODQzOCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDIxODA4RUUzMjBlREY2NGMwMTlBNmJiMEY3RTRiRkIzZDYyRjA2RWMifQ",
      payload: "eyJkb21haW4iOiJhbm9uLXBvc3QudmVyY2VsLmFwcCJ9",
      signature:"MHg0ZDk4N2FiNjkzMzBiMmIwNTQyYTUxZTllYzAxNTM1YWNjNTAzNjE5MDU2ZjIzOTQ4MzYxMDNkMmRjNjEwYWQ5NjI2ZmVlNGMwY2Y2YmExMTZiNDdjZjk1MmI4NjVkOTMyMTliMTM2ODUwMTk2MDc1NDYyMGM0MjMwODIxOWUyNTFi"
    },
    frame: {
      version: "1",
      name: "AnonPost",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/banner.png`,
      buttonTitle: "AnonPost",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#000000",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
