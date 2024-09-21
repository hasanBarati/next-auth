import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
const sql=neon("postgresql://nextauth_owner:Fd9oUqQkwp0e@ep-proud-lake-a1vhiaiw.ap-southeast-1.aws.neon.tech/nextauth?sslmode=require")
const db=drizzle(sql)

export default db