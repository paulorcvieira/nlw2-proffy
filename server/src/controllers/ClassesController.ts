import { Request, Response, request } from 'express'
import db from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinute';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    try {
      const filters = req.query

      const week_day = filters.week_day as string
      const subject = filters.subject as string
      const time = filters.time as string

      if (!week_day || !subject || !time) {
        return res.status(400).json({
          error: 'Missing filters to search classes.'
        })
      }

      const timeInMinutes = convertHourToMinute(time)

      const classes = await db('classes')
        .whereExists(function() {
          this.select('class_schedule.*')
            this.from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])

      return res.status(200).json(classes)
    } catch (err) {
      return res.status(400).json({
        error: 'Unexpected error while filter classes'
      })
    }
  }

  async store(req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
  
    const trx = await db.transaction()
  
    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })
    
      const user_id = insertedUsersIds[0]
    
      const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id,
      })
    
      const class_id = insertedClassesId[0]
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinute(scheduleItem.from),
          to: convertHourToMinute(scheduleItem.to)
        }
      })
    
      await trx('class_schedule').insert(classSchedule)
    
      await trx.commit()
    
      return res.status(201).json(req.body)
    } catch (err) {
      console.log(err)
  
      await trx.rollback()
  
      return res.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}