import { definePlugin } from "sanity";
import { UploadIcon, TrashIcon, ThListIcon } from "@sanity/icons";
import { BulkUploadTool } from "./BulkUploadTool";
import { BulkDeleteTool } from "./BulkDeleteTool";
import { ProductsTable } from "./ProductsTable";

export const bulkUploadPlugin = definePlugin({
  name: "bulk-upload-tool",
  tools: [
    {
      name: "products-table",
      title: "Products",
      icon: ThListIcon,
      component: ProductsTable,
    },
    {
      name: "bulk-upload",
      title: "Bulk Upload",
      icon: UploadIcon,
      component: BulkUploadTool,
    },
    {
      name: "bulk-delete",
      title: "Bulk Delete",
      icon: TrashIcon,
      component: BulkDeleteTool,
    },
  ],
});
