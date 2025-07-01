import { Global, Module } from "@nestjs/common";
import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { join } from "path";
import { MailerService } from "./maile.service";
@Global()
@Module({
    imports: [
        NestMailerModule.forRoot({
            transport: {
                service: "gmail",
                auth: {
                    user: "A1orbek.09@gmail.com",
                    pass: "xpknpqxcahubdaor"
                }
            },
            defaults: {
                from: "AQSH <A1orbek.09@gmail.com>"
            },
            template: {
                dir: join(process.cwd(),"src","templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        })
    ],
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule{}