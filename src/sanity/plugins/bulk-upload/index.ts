import { definePlugin } from "sanity";
import { UploadIcon } from "@sanity/icons";
import { BulkUploadTool } from "./BulkUploadTool";

export const bulkUploadPlugin = definePlugin({
  name: "bulk-upload-tool",
  tools: [
    {
      name: "bulk-upload",
      title: "Bulk Upload",
      icon: UploadIcon,
      component: BulkUploadTool,
    },
  ],
});
