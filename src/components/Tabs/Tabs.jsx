import React, { useContext, useState } from 'react'
import './Tabs.css'
import { BookContext } from '../../store/book-context'
import ModalBookInfo from '../ModalBookInfo/ModalBookInfo'
import SecondTab from '../SecondTab/SecondTab'
import FirstTab from '../FirstTab/FirstTab'

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('tab1')

  const { selectedAddedBook } = useContext(BookContext)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="tabs">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1')}
        >
          Yearly
        </button>
        <button
          className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          Monthly
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <FirstTab />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <SecondTab />
          </div>
        )}
      </div>
      <ModalBookInfo book={selectedAddedBook} />
    </div>
  )
}
