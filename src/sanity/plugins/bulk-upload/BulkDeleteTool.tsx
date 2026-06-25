import { useState, useCallback, useEffect, useMemo } from "react";
import { useClient, useProjectId, useDataset } from "sanity";
import { createClient } from "@sanity/client";
import {
  Card,
  Stack,
  Button,
  Text,
  Heading,
  Flex,
  Badge,
  Spinner,
  useToast,
  Dialog,
  Box,
} from "@sanity/ui";
import { TrashIcon, CheckmarkCircleIcon, CloseCircleIcon } from "@sanity/icons";

const TILE_SIZES = [
  "600×1200 mm",
  "600×600 mm",
  "400×400 mm",
  "300×600 mm",
  "300×450 mm",
  "300×300 mm",
];

interface SizeCount {
  size: string;
  count: number;
}

interface ProductPreview {
  _id: string;
  name: string;
  series: string;
  finish: string;
  category: string;
}

const SANITY_WRITE_TOKEN = "skhYPqvRE0Ppu0r3FI6iQQ0qIkRrHWEU0tyPWqMV9cdnVtyMzIFdfGzYP7mnZKJDSIFa8sgtYbpcKmhtVDgYbl4DDdVTnNQVouGv4j7XiVtEMkooc0p5gGzirNFBqjRUXcVcmXhnnT6iyOcVjB1Nxc8dZw5N5H1IyKHfVli7gLi34mqlfGXq";

export function BulkDeleteTool() {
  const readClient = useClient({ apiVersion: "2026-04-01" });
  const projectId = useProjectId();
  const dataset = useDataset();
  const toast = useToast();

  const client = useMemo(
    () =>
      createClient({
        projectId,
        dataset,
        apiVersion: "2026-04-01",
        token: SANITY_WRITE_TOKEN,
        useCdn: false,
      }),
    [projectId, dataset]
  );

  const [sizeCounts, setSizeCounts] = useState<SizeCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    try {
      const counts = await Promise.all(
        TILE_SIZES.map(async (size) => {
          const count = await client.fetch<number>(
            `count(*[_type == "tileProduct" && size == $size])`,
            { size }
          );
          return { size, count };
        })
      );
      setSizeCounts(counts);
    } catch {
      toast.push({ status: "error", title: "Failed to fetch product counts" });
    }
    setLoading(false);
  }, [client, toast]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const handleSelectSize = useCallback(
    async (size: string) => {
      setSelectedSize(size);
      setLoadingProducts(true);
      try {
        const result = await client.fetch<ProductPreview[]>(
          `*[_type == "tileProduct" && size == $size] | order(series asc, name asc) { _id, name, series, finish, category }`,
          { size }
        );
        setProducts(result);
      } catch {
        toast.push({ status: "error", title: "Failed to fetch products" });
      }
      setLoadingProducts(false);
    },
    [client, toast]
  );

  const handleDelete = useCallback(async () => {
    if (!selectedSize || products.length === 0) return;

    setDeleting(true);
    setProgress({ done: 0, total: products.length });

    const batchSize = 50;
    let done = 0;

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const tx = client.transaction();
      batch.forEach((p) => tx.delete(p._id));
      try {
        await tx.commit();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        toast.push({ status: "error", title: `Delete failed: ${msg}` });
        setDeleting(false);
        return;
      }
      done += batch.length;
      setProgress({ done, total: products.length });
    }

    toast.push({
      status: "success",
      title: `Deleted ${products.length} products (${selectedSize})`,
    });

    setDeleting(false);
    setConfirmOpen(false);
    setSelectedSize(null);
    setProducts([]);
    fetchCounts();
  }, [selectedSize, products, client, toast, fetchCounts]);

  return (
    <Card padding={4} sizing="border" style={{ height: "100%", overflow: "auto" }}>
      <Stack space={5}>
        <Stack space={3}>
          <Heading size={3}>Bulk Delete Products</Heading>
          <Text size={1} muted>
            Select a tile size to preview and delete all products of that size.
          </Text>
        </Stack>

        {loading ? (
          <Flex align="center" gap={3} padding={4}>
            <Spinner />
            <Text size={1} muted>Loading product counts…</Text>
          </Flex>
        ) : (
          <Stack space={3}>
            <Heading size={1}>Products by Size</Heading>
            <Stack space={2}>
              {sizeCounts.map(({ size, count }) => (
                <Card
                  key={size}
                  padding={3}
                  radius={2}
                  shadow={1}
                  tone={selectedSize === size ? "primary" : "default"}
                  style={{ cursor: count > 0 ? "pointer" : "default", opacity: count === 0 ? 0.5 : 1 }}
                  onClick={() => {
                    if (count > 0) handleSelectSize(size);
                  }}
                >
                  <Flex justify="space-between" align="center">
                    <Text size={2} weight="semibold">{size}</Text>
                    <Badge
                      tone={count > 0 ? "default" : "caution"}
                      fontSize={1}
                    >
                      {count} products
                    </Badge>
                  </Flex>
                </Card>
              ))}
            </Stack>

            <Button
              text="Refresh Counts"
              mode="ghost"
              fontSize={1}
              onClick={fetchCounts}
            />
          </Stack>
        )}

        {selectedSize && (
          <Stack space={4}>
            <Flex justify="space-between" align="center">
              <Heading size={1}>
                {selectedSize} — {products.length} products
              </Heading>
              <Flex gap={2}>
                <Button
                  text="Back"
                  mode="ghost"
                  fontSize={1}
                  onClick={() => {
                    setSelectedSize(null);
                    setProducts([]);
                  }}
                />
                <Button
                  text={`Delete All ${products.length} Products`}
                  tone="critical"
                  icon={TrashIcon}
                  fontSize={1}
                  disabled={products.length === 0 || loadingProducts}
                  onClick={() => setConfirmOpen(true)}
                />
              </Flex>
            </Flex>

            {loadingProducts ? (
              <Flex align="center" gap={3} padding={4}>
                <Spinner />
                <Text size={1} muted>Loading products…</Text>
              </Flex>
            ) : (
              <Card padding={0} radius={2} shadow={1} style={{ overflow: "auto", maxHeight: "500px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "var(--card-bg2-color)", position: "sticky", top: 0 }}>
                      <th style={thStyle}>#</th>
                      <th style={thStyle}>Product Name</th>
                      <th style={thStyle}>Series</th>
                      <th style={thStyle}>Finish</th>
                      <th style={thStyle}>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, i) => (
                      <tr key={p._id} style={{ borderBottom: "1px solid var(--card-border-color)" }}>
                        <td style={tdStyle}>{i + 1}</td>
                        <td style={tdStyle}>{p.name}</td>
                        <td style={tdStyle}>{p.series}</td>
                        <td style={tdStyle}>{p.finish}</td>
                        <td style={tdStyle}>{p.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </Stack>
        )}

        {confirmOpen && (
          <Dialog
            id="confirm-delete"
            header="Confirm Bulk Delete"
            onClose={() => !deleting && setConfirmOpen(false)}
            width={1}
          >
            <Box padding={4}>
              <Stack space={4}>
                {deleting ? (
                  <Stack space={3}>
                    <Flex align="center" gap={3}>
                      <Spinner />
                      <Text size={2}>
                        Deleting {progress.done} / {progress.total}…
                      </Text>
                    </Flex>
                    <Card padding={2} radius={2} tone="transparent">
                      <div
                        style={{
                          height: "6px",
                          borderRadius: "3px",
                          background: "var(--card-border-color)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${(progress.done / progress.total) * 100}%`,
                            background: "var(--card-badge-critical-bg-color, #e53e3e)",
                            borderRadius: "3px",
                            transition: "width 0.3s",
                          }}
                        />
                      </div>
                    </Card>
                  </Stack>
                ) : (
                  <>
                    <Card padding={3} radius={2} tone="critical">
                      <Text size={2}>
                        This will permanently delete <strong>{products.length} products</strong> of
                        size <strong>{selectedSize}</strong>. This action cannot be undone.
                      </Text>
                    </Card>
                    <Flex gap={3} justify="flex-end">
                      <Button
                        text="Cancel"
                        mode="ghost"
                        fontSize={1}
                        onClick={() => setConfirmOpen(false)}
                      />
                      <Button
                        text={`Yes, Delete ${products.length} Products`}
                        tone="critical"
                        icon={TrashIcon}
                        fontSize={1}
                        onClick={handleDelete}
                      />
                    </Flex>
                  </>
                )}
              </Stack>
            </Box>
          </Dialog>
        )}
      </Stack>
    </Card>
  );
}

const thStyle: React.CSSProperties = {
  padding: "10px 12px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle: React.CSSProperties = {
  padding: "8px 12px",
  verticalAlign: "middle",
};
