import { createLogger , format , transports } from "winston";
const { combine, timestamp, label, prettyPrint } = format;


export const logger = createLogger({
  format: combine(
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    prettyPrint() , 
  ),
  transports: [
    new transports.Console() , 
    new transports.File({
        filename : 'info.log' , 
        level : 'info'
    }) , 
    new transports.File({
        filename : 'errors.log' , 
        level : 'info' , 
    }) , 
    new transports.File({
        filename : 'warns.log' , 
        level : 'warn' 
    })
  ]
})