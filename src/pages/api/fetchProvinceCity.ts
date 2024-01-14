export default async function handler(
  req: {
    method: string;
  },
  res: {
    status: (arg0: number) => {
      (): string;
      new (): string;
      end: { (): string; new (): string };
      json: { (arg0: { error: string }): void; new (): string };
    };
  }
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const apiRes = await fetch("https://api.rajaongkir.com/starter/city", {
      method: "GET",
      headers: {
        key: "976972a689228035eb3c467d7cf44120",
      },
    });

    if (!apiRes.ok) {
      throw new Error("Failed to fetch provinces");
    }

    const result = await apiRes.json();
    res.status(200).json(result.rajaongkir.results);
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching provinces:", err.message);
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
}
