import { Request, Response, request } from 'express'
import db from '../database/connection';

export default class ConnectionsController {
  async index(req: Request, res: Response) {
    try {
      const totalConnections = await db('connections').count('* as total')

      const { total } = totalConnections[0]

      res.status(200).json({ total })
    } catch(err) {
      return res.status(400).json({
        error: 'Unexpected error while get total connections'
      })
    }
  }

  async store(req: Request, res: Response) {
    const { user_id } = req.body

    try {
      await db('connections').insert({
        user_id,
      })

      return res.status(201).json(req.body)
    } catch(err) {
      return res.status(400).json({
        error: 'Unexpected error while creating new connection'
      })
    }
  }
}