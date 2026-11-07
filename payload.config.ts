import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { ContactMessages } from "./src/collections/ContactMessages";
import { Media } from "./src/collections/Media";
import { NewsletterSubscriptions } from "./src/collections/NewsletterSubscriptions";
import { Orders } from "./src/collections/Orders";
import { Products } from "./src/collections/Products";
import { Users } from "./src/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | The Floating Duck",
    },
  },
  collections: [Users, Media, Products, Orders, ContactMessages, NewsletterSubscriptions],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "postgres://postgres:postgres@127.0.0.1:5432/floating_duck",
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "development-only-change-before-launch",
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
