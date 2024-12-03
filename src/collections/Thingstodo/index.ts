import type { CollectionConfig } from "payload";

import { isAdmin } from "../../access/isAdmin";
import { sidebarDestination } from "../../fields/sidebarDestination";
import { slugField } from "../../fields/slug";
// import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { revalidatePost } from "./hooks/revalidatePost";
import { populateAuthors } from "./hooks/populateAuthors";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isAdminOrEditorOrUser } from "../../access/isAdminOrEditorOrUser";

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const Thingstodo: CollectionConfig = {
  slug: "thingstodo",
  labels: {
    singular: {
      en: 'Things to do',
      fr: 'Que faire',
    },
    plural: {
      en: 'Things to do',
      fr: 'Que faire',
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt", "_status"],
    preview: (doc: any) => {
      return `${
        process.env.PAYLOAD_PUBLIC_SERVER_URL
      }/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/thingstodo/${doc?.slug}`
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    }
  },
  hooks: {
    // beforeChange: [populatePublishedAt],
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  access: {
    read: isAdminOrEditorOrUser,
    update: isAdminOrEditor,
    create: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    sidebarDestination,
    {
      name: "title",
      label: { en: "Title", fr: "Titre" },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "paragraph",
      label: { en: "Paragraph", fr: "Paragraphe" },
      type: "richText",
      localized: true,
      // editor: lexicalEditor({
      //   features: ({ defaultFeatures }) => [
      //     ...defaultFeatures,
      //     // The HTMLConverter Feature is the feature which manages the HTML serializers.
      //     // If you do not pass any arguments to it, it will use the default serializers.
      //     HTMLConverterFeature({}),
      //   ],
      // }),
    },
    slugField(),
  ],
};
