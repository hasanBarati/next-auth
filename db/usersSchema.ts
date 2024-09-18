
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users=pgTable("users",{
    id:serial("id").primaryKey(),
    email:text("email").unique(),
    password:text("password"),
    createdAt:timestamp("created-at").defaultNow(),
    twoFactorAuthSecret:text("2fa-secret"),
    twoFactorAuthactivated:boolean("2fa-activated").default(false)
})