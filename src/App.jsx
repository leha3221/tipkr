import React, { useState } from 'react'
import './App.css'

function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  const calculateBMI = (e) => {
    e.preventDefault()
    if (height && weight && height > 0 && weight > 0) {
      const heightInMeters = height / 100
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
      setBmi(bmiValue)
      determineCategory(bmiValue)
    }
  }

  const determineCategory = (bmiValue) => {
    const value = parseFloat(bmiValue)
    if (value < 18.5) {
      setCategory('Недостаточный вес')
    } else if (value >= 18.5 && value <= 24.9) {
      setCategory('Нормальный вес')
    } else if (value >= 25 && value <= 29.9) {
      setCategory('Избыточный вес')
    } else {
      setCategory('Ожирение')
    }
  }

  const resetForm = () => {
    setHeight('')
    setWeight('')
    setBmi(null)
    setCategory('')
  }

  const getCategoryColor = () => {
    if (!bmi) return '#666'
    const value = parseFloat(bmi)
    if (value < 18.5) return '#2196F3'
    if (value >= 18.5 && value <= 24.9) return '#4CAF50'
    if (value >= 25 && value <= 29.9) return '#FF9800'
    return '#F44336'
  }

  return (
    <div className="app">
      <div className="calculator">
        <h1>Калькулятор ИМТ</h1>
        <p>Рассчитайте ваш индекс массы тела</p>
        
        <form onSubmit={calculateBMI} className="bmi-form">
          <div className="input-group">
            <label htmlFor="height">Рост (см):</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Например, 175"
              min="1"
              max="300"
            />
          </div>

          <div className="input-group">
            <label htmlFor="weight">Вес (кг):</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Например, 70"
              min="1"
              max="500"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Рассчитать ИМТ
            </button>
            <button type="button" onClick={resetForm} className="reset-btn">
              Сбросить
            </button>
          </div>
        </form>

        {bmi && (
          <div className="result" style={{ borderColor: getCategoryColor() }}>
            <h2>Результат</h2>
            <div className="bmi-value" style={{ color: getCategoryColor() }}>
              {bmi}
            </div>
            <div className="bmi-category" style={{ color: getCategoryColor() }}>
              {category}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App