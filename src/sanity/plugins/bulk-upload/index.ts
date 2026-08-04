import { definePlugin } from "sanity";
import { UploadIcon, TrashIcon } from "@sanity/icons";
import { BulkUploadTool } from "./BulkUploadTool";
import { BulkDeleteTool } from "./BulkDeleteTool";

export const bulkUploadPlugin = definePlugin({
  name: "bulk-upload-tool",
  tools: [
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
