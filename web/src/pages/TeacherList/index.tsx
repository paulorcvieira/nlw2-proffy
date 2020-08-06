import React, { useState, FormEvent } from 'react'
import api from '../../services/api'

import searchIcon from '../../assets/images/icons/search.svg'

import './styles.css'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

function TeacherList() {
  const [teachers, setTeachers] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function handleFilterTeacher(e: FormEvent) {
    e.preventDefault()

    const { data } = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    })

    setTeachers(data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleFilterTeacher}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Direito Penal', label: 'Direito Penal' },
              { value: 'Direito Processual Penal', label: 'Direito Processual Penal' },
              { value: 'Direito Constitucional', label: 'Direito Constitucional' },
              { value: 'Direito do Trabalho', label: 'Direito do Trabalho' },
              { value: 'Direito Processual do Trabalho', label: 'Direito Processual do Trabalho' },
              { value: 'Direito Tributário', label: 'Direito Tributário' },
              { value: 'Direito Constitucional', label: 'Direito Constitucional' },
              { value: 'Direito Internacional', label: 'Direito Internacional' },
              { value: 'Direito Civil', label: 'Direito Civil' },
              { value: 'Direito Processual Civil', label: 'Direito Processual Civil' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <button type="submit">
            <img src={searchIcon} alt="Buscar..."/>
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList