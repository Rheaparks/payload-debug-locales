import type { Field } from "payload";
import { slugField } from "./slug";

export const sidebarDestination: Field = {
  name: "sidebarDestination",
  label: false,
  type: "group",
  admin: {
    position: "sidebar",
  },
  fields: [
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    }
  ],
};
