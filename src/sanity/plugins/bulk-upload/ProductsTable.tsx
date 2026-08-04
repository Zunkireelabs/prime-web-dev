import { useState, useCallback, useEffect, useMemo } from "react";
import { useClient } from "sanity";
import { IntentLink } from "sanity/router";
import {
  Card,
  Stack,
  Text,
  Heading,
  Flex,
  Badge,
  Spinner,
  TextInput,
  Select,
  Box,
} from "@sanity/ui";
import { SearchIcon } from "@sanity/icons";

interface ProductRow {
  _id: string;
  name: string;
  size: string;
  series: string;
  finish: string;
  category: string;
  application: string;
  spaces?: string[];
  catalogName?: string;
  hidden?: boolean;
  imageUrl?: string;
}

const TILE_SIZES = [
  "300×300 mm",
  "300×450 mm",
  "300×600 mm",
  "400×400 mm",
  "600×600 mm",
  "600×1200 mm",
  "800×800 mm",
  "800×1600 mm",
  "1200×1200 mm",
  "1200×2400 mm",
];

export function ProductsTable() {
  const client = useClient({ apiVersion: "2026-04-01" });

  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.fetch<ProductRow[]>(
        `*[_type == "tileProduct"] | order(size asc, series asc, name asc) {
          _id,
          name,
          size,
          series,
          finish,
          category,
          application,
          spaces,
          hidden,
          "catalogName": catalog->name,
          "imageUrl": image.asset->url
        }`
      );
      setProducts(result);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (sizeFilter && p.size !== sizeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${p.name} ${p.series} ${p.finish} ${p.category} ${p.catalogName || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [products, search, sizeFilter]);

  return (
    <Card padding={4} sizing="border" style={{ height: "100%", overflow: "auto" }}>
      <Stack space={4}>
        <Stack space={3}>
          <Heading size={3}>Products</Heading>
          <Text size={1} muted>
            All tile products in one table. Click a row to open it.
          </Text>
        </Stack>

        <Flex gap={3} align="center">
          <Box flex={1}>
            <TextInput
              icon={SearchIcon}
              placeholder="Search name, series, finish, category…"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </Box>
          <Box style={{ minWidth: "180px" }}>
            <Select value={sizeFilter} onChange={(e) => setSizeFilter(e.currentTarget.value)}>
              <option value="">All sizes</option>
              {TILE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </Box>
          <Badge tone="default" fontSize={1}>
            {filtered.length} products
          </Badge>
        </Flex>

        {loading ? (
          <Flex align="center" gap={3} padding={4}>
            <Spinner />
            <Text size={1} muted>Loading products…</Text>
          </Flex>
        ) : (
          <Card padding={0} radius={2} shadow={1} style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "var(--card-bg2-color)", position: "sticky", top: 0, zIndex: 1 }}>
                  <th style={thStyle}></th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Series</th>
                  <th style={thStyle}>Finish</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Application</th>
                  <th style={thStyle}>Catalog</th>
                  <th style={thStyle}>Spaces</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <IntentLink
                    key={p._id}
                    intent="edit"
                    params={{ id: p._id, type: "tileProduct" }}
                    style={{ display: "contents", color: "inherit", textDecoration: "none" }}
                  >
                    <tr
                      style={{ borderBottom: "1px solid var(--card-border-color)", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card-bg2-color)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={tdStyle}>
                        {p.imageUrl ? (
                          <img
                            src={`${p.imageUrl}?w=60&h=60&fit=crop`}
                            alt=""
                            style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4 }}
                          />
                        ) : (
                          <div style={{ width: 36, height: 36, borderRadius: 4, background: "var(--card-border-color)" }} />
                        )}
                      </td>
                      <td style={tdStyle}>{p.name}</td>
                      <td style={tdStyle}>{p.size}</td>
                      <td style={tdStyle}>{p.series}</td>
                      <td style={tdStyle}>{p.finish}</td>
                      <td style={tdStyle}>{p.category}</td>
                      <td style={tdStyle}>{p.application}</td>
                      <td style={tdStyle}>{p.catalogName || "—"}</td>
                      <td style={tdStyle}>{(p.spaces || []).join(", ") || "—"}</td>
                      <td style={tdStyle}>
                        {p.hidden ? (
                          <Badge tone="caution" fontSize={0}>Hidden</Badge>
                        ) : (
                          <Badge tone="positive" fontSize={0}>Live</Badge>
                        )}
                      </td>
                    </tr>
                  </IntentLink>
                ))}
              </tbody>
            </table>
          </Card>
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
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "8px 12px",
  verticalAlign: "middle",
};
