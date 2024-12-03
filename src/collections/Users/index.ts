import { CollectionConfig } from "payload";
import { isAdmin, isAdminFieldLevel } from "../../access/isAdmin";
import { isAdminOrSelf } from "@/access/isAdminOrSelf";
// import { isAdminOrEditor } from "../../access/isAdminOrEditor";
// import { isAdminOrEditorOrUser } from "../../access/isAdminOrEditorOrUser";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 864000,
    maxLoginAttempts: 5,
    lockTime: 6000000,
    cookies: {
      secure: true,
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['firstName', 'name', 'email'],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "name",
      label: { en: "Name", fr: "Nom" },
      type: "text",
      required: true,
    },
    {
      name: "firstName",
      label: { en: "Firstname", fr: "Prénom" },
      type: "text",
      required: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      // Save this field to the JWT so we can use from "req.user"
      saveToJWT: true, 
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],
      required: true,
      // defaultValue: ["user"],
      access: {
        // Only admins can create or update a value for this field
        read: isAdminFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
  access: {
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    // Only admins can update all
    update: isAdmin,
    // Only admins can delete users
    delete: isAdmin,
  },
};

export default Users;
