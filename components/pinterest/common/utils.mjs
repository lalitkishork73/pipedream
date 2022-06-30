import urlExist from "url-exist";
import fs from "fs";
import { encode } from "js-base64";
import mime from "mime-types";
import constants from "./constants.mjs";

export default {
  isValidFile(filePath) {
    return fs.existsSync(filePath);
  },
  getFileMeta(filePath) {
    return {
      source_type: "image_base64",
      content_type: mime.lookup(filePath),
      data: encode([
        ...fs.readFileSync(filePath, {
          flag: "r",
        }).values(),
      ]),
    };
  },
  async isValidUrl(url) {
    return urlExist(url);
  },
  getUrlMeta(url) {
    return {
      source_type: "image_url",
      url,
    };
  },
  async *getResourcesStream({
    resourceFn,
    resourceFnArgs,
  }) {
    let bookmark;
    while (true) {
      const nextResources = await resourceFn({
        ...resourceFnArgs,
        params: {
          ...resourceFnArgs.params,
          bookmark,
          page_size: constants.pageSize,
        },
      });
      bookmark = nextResources?.bookmark;
      if (!nextResources) {
        throw new Error("No response from Pinterest API.");
      }
      for (const resource of nextResources.items) {
        yield resource;
      }
      if (!bookmark) {
        return;
      }
    }
  },
};